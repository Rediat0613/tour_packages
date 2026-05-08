import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AgencyStatus, ModerationDecision, ModerationTargetType } from '@prisma/client';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAgencyDto } from './dto/create-agency.dto';

@Injectable()
export class AgenciesService {
  constructor(private readonly prisma: PrismaService) {}

  async createForCurrentUser(user: AuthenticatedUser, dto: CreateAgencyDto) {
    if (user.agencyId) {
      throw new BadRequestException('This user already belongs to an agency.');
    }

    return this.prisma.$transaction(async (tx) => {
      const agency = await tx.agency.create({ data: dto });
      await tx.user.update({
        where: { id: user.id },
        data: { agencyId: agency.id },
      });

      return agency;
    });
  }

  async findMine(user: AuthenticatedUser) {
    if (!user.agencyId) {
      throw new NotFoundException('No agency is linked to this user.');
    }

    return this.prisma.agency.findUniqueOrThrow({
      where: { id: user.agencyId },
      include: {
        staff: {
          select: {
            id: true,
            email: true,
            fullName: true,
            role: true,
          },
        },
      },
    });
  }

  async verify(id: string, moderator: AuthenticatedUser, reason?: string) {
    return this.prisma.$transaction(async (tx) => {
      const agency = await tx.agency.update({
        where: { id },
        data: { status: AgencyStatus.VERIFIED },
      });

      await tx.moderationLog.create({
        data: {
          targetType: ModerationTargetType.AGENCY,
          targetId: agency.id,
          decision: ModerationDecision.APPROVED,
          reason,
          moderatorId: moderator.id,
        },
      });

      return agency;
    });
  }
}
