import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ModerationService {
  constructor(private readonly prisma: PrismaService) {}

  findRecentDecisions() {
    return this.prisma.moderationLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}
