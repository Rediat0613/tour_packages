import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateTripDto } from './dto/create-trip.dto';
import { RejectTripDto } from './dto/reject-trip.dto';
import { TripsService } from './trips.service';

@Controller()
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENCY_STAFF)
  @Post('trips')
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateTripDto) {
    return this.tripsService.create(user, dto);
  }

  @Get('trips')
  findPublic() {
    return this.tripsService.findPublic();
  }

  @Get('trips/:id')
  findPublicById(@Param('id') id: string) {
    return this.tripsService.findPublicById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('admin/trips/:id/approve')
  approve(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.tripsService.approve(id, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('admin/trips/:id/reject')
  reject(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: RejectTripDto,
  ) {
    return this.tripsService.reject(id, user, dto.reason);
  }
}
