import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ModerationDecision,
  ModerationTargetType,
  RatingStatus,
  TripStatus,
} from '@prisma/client';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { ModerateRatingDto } from './dto/moderate-rating.dto';

@Injectable()
export class RatingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRatingDto) {
    const trip = await this.prisma.trip.findUnique({ where: { id: dto.tripId } });

    if (!trip || trip.status !== TripStatus.APPROVED) {
      throw new NotFoundException('Trip not found.');
    }

    return this.prisma.rating.create({
      data: {
        tripId: trip.id,
        agencyId: trip.agencyId,
        score: dto.score,
      },
    });
  }

  moderate(id: string, moderator: AuthenticatedUser, dto: ModerateRatingDto) {
    return this.prisma.$transaction(async (tx) => {
      const rating = await tx.rating.update({
        where: { id },
        data: {
          status:
            dto.decision === ModerationDecision.APPROVED
              ? RatingStatus.APPROVED
              : RatingStatus.REJECTED,
        },
      });

      await tx.moderationLog.create({
        data: {
          targetType: ModerationTargetType.RATING,
          targetId: rating.id,
          decision: dto.decision,
          reason: dto.reason,
          moderatorId: moderator.id,
        },
      });

      return rating;
    });
  }
}
