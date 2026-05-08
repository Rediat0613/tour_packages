import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgenciesModule } from './agencies/agencies.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { LeadsModule } from './leads/leads.module';
import { ModerationModule } from './moderation/moderation.module';
import { PrismaModule } from './prisma/prisma.module';
import { RatingsModule } from './ratings/ratings.module';
import { TripsModule } from './trips/trips.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    UsersModule,
    AuthModule,
    AgenciesModule,
    TripsModule,
    LeadsModule,
    RatingsModule,
    ModerationModule,
  ],
})
export class AppModule {}
