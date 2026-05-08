import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AgenciesService } from './agencies.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { VerifyAgencyDto } from './dto/verify-agency.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Roles(Role.AGENCY_STAFF)
  @Post('agencies')
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateAgencyDto) {
    return this.agenciesService.createForCurrentUser(user, dto);
  }

  @Roles(Role.AGENCY_STAFF)
  @Get('agencies/me')
  findMine(@CurrentUser() user: AuthenticatedUser) {
    return this.agenciesService.findMine(user);
  }

  @Roles(Role.ADMIN)
  @Patch('admin/agencies/:id/verify')
  verify(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: VerifyAgencyDto,
  ) {
    return this.agenciesService.verify(id, user, dto.reason);
  }
}
