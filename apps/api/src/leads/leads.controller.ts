import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadStatusDto } from './dto/update-lead-status.dto';
import { LeadsService } from './leads.service';

@Controller()
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post('leads')
  create(@Body() dto: CreateLeadDto) {
    return this.leadsService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENCY_STAFF)
  @Get('agency/leads')
  findAgencyLeads(@CurrentUser() user: AuthenticatedUser) {
    return this.leadsService.findAgencyLeads(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENCY_STAFF)
  @Patch('agency/leads/:id/status')
  updateAgencyLeadStatus(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateLeadStatusDto,
  ) {
    return this.leadsService.updateAgencyLeadStatus(id, user, dto);
  }
}
