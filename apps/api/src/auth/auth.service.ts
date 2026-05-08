import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterAgencyStaffDto } from './dto/register-agency-staff.dto';
import { AuthenticatedUser } from './types/authenticated-user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registerAgencyStaff(dto: RegisterAgencyStaffDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (existingUser) {
      throw new ConflictException('A user with this email already exists.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.$transaction(async (tx) => {
      const agency = await tx.agency.create({
        data: {
          name: dto.agencyName,
          email: dto.email,
        },
      });

      return tx.user.create({
        data: {
          email: dto.email,
          passwordHash,
          fullName: dto.fullName,
          role: Role.AGENCY_STAFF,
          agencyId: agency.id,
        },
      });
    });

    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    return this.buildAuthResponse(user);
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<AuthenticatedUser & { sub: string }>(
        refreshToken,
        {
          secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        },
      );

      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token.');
      }

      return this.buildAuthResponse(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token.');
    }
  }

  private async buildAuthResponse(user: {
    id: string;
    email: string;
    fullName: string;
    role: Role;
    agencyId: string | null;
  }) {
    const authUser: AuthenticatedUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      agencyId: user.agencyId,
    };

    const payload = {
      sub: authUser.id,
      email: authUser.email,
      fullName: authUser.fullName,
      role: authUser.role,
      agencyId: authUser.agencyId,
    };
    const accessTokenTtl = this.configService.get<string>('JWT_ACCESS_TTL') ?? '15m';
    const refreshTokenTtl = this.configService.get<string>('JWT_REFRESH_TTL') ?? '7d';

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: accessTokenTtl as never,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: refreshTokenTtl as never,
      }),
    ]);

    return {
      user: authUser,
      accessToken,
      refreshToken,
    };
  }
}
