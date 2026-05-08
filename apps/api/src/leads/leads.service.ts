import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TripStatus } from '@prisma/client';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadStatusDto } from './dto/update-lead-status.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLeadDto) {
    const trip = await this.prisma.trip.findUnique({ where: { id: dto.tripId } });

    if (!trip || trip.status !== TripStatus.APPROVED) {
      throw new NotFoundException('Trip not found.');
    }

    return this.prisma.lead.create({
      data: {
        tripId: trip.id,
        agencyId: trip.agencyId,
        fullName: dto.fullName,
        phone: dto.phone,
        email: dto.email,
        numberOfTravelers: dto.numberOfTravelers,
        preferredDates: dto.preferredDates,
        nationalityResidence: dto.nationalityResidence,
        message: dto.message,
      },
    });
  }

  findAgencyLeads(user: AuthenticatedUser) {
    if (!user.agencyId) {
      throw new BadRequestException('Agency staff must belong to an agency.');
    }

    return this.prisma.lead.findMany({
      where: { agencyId: user.agencyId },
      include: { trip: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  updateAgencyLeadStatus(id: string, user: AuthenticatedUser, dto: UpdateLeadStatusDto) {
    if (!user.agencyId) {
      throw new BadRequestException('Agency staff must belong to an agency.');
    }

    return this.prisma.lead.update({
      where: {
        id,
        agencyId: user.agencyId,
      },
      data: { status: dto.status },
    });
  }
}
