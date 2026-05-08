import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {
  AgencyStatus,
  ModerationDecision,
  ModerationTargetType,
  Prisma,
  TripStatus,
} from '@prisma/client';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';

@Injectable()
export class TripsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: AuthenticatedUser, dto: CreateTripDto) {
    if (!user.agencyId) {
      throw new BadRequestException('Agency staff must belong to an agency before creating trips.');
    }

    const agency = await this.prisma.agency.findUnique({ where: { id: user.agencyId } });

    if (!agency) {
      throw new NotFoundException('Agency not found.');
    }

    if (agency.status !== AgencyStatus.VERIFIED) {
      throw new BadRequestException('Agency must be verified before submitting trips.');
    }

    return this.prisma.trip.create({
      data: {
        agencyId: agency.id,
        title: dto.title,
        summary: dto.summary,
        itinerary: dto.itinerary,
        destinations: dto.destinations,
        durationDays: dto.durationDays,
        kind: dto.kind,
        category: dto.category,
        religiousTags: dto.religiousTags,
        pricingMode: dto.pricingMode,
        startingPriceCents: dto.startingPriceCents,
        currency: dto.currency ?? 'USD',
        departureMonths: dto.departureMonths,
        inclusions: dto.inclusions,
        exclusions: dto.exclusions,
        cancellationPolicy: dto.cancellationPolicy,
        status: TripStatus.SUBMITTED,
        submittedAt: new Date(),
        images: dto.images.map((image, index) => ({
          originalName: image.originalName,
          size: image.size,
          mimeType: image.mimeType,
          ...(image.objectKey != null ? { objectKey: image.objectKey } : {}),
          sortOrder: image.sortOrder ?? index,
        })) as Prisma.InputJsonValue,
      },
      include: { agency: true },
    });
  }

  findPublic() {
    return this.prisma.trip.findMany({
      where: { status: TripStatus.APPROVED },
      include: {
        agency: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findPublicById(id: string) {
    const trip = await this.prisma.trip.findFirst({
      where: { id, status: TripStatus.APPROVED },
      include: {
        agency: true,
      },
    });

    if (!trip) {
      throw new NotFoundException('Trip not found.');
    }

    return trip;
  }

  approve(id: string, moderator: AuthenticatedUser) {
    return this.moderate(id, moderator, ModerationDecision.APPROVED);
  }

  reject(id: string, moderator: AuthenticatedUser, reason: string) {
    return this.moderate(id, moderator, ModerationDecision.REJECTED, reason);
  }

  private async moderate(
    id: string,
    moderator: AuthenticatedUser,
    decision: ModerationDecision,
    reason?: string,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const trip = await tx.trip.update({
        where: { id },
        data:
          decision === ModerationDecision.APPROVED
            ? {
                status: TripStatus.APPROVED,
                approvedAt: new Date(),
                rejectedAt: null,
                rejectionReason: null,
              }
            : {
                status: TripStatus.REJECTED,
                rejectedAt: new Date(),
                rejectionReason: reason,
              },
      });

      await tx.moderationLog.create({
        data: {
          targetType: ModerationTargetType.TRIP,
          targetId: trip.id,
          decision,
          reason,
          moderatorId: moderator.id,
        },
      });

      return trip;
    });
  }
}
