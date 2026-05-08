import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ModerationDecision } from '@prisma/client';

export class ModerateRatingDto {
  @IsEnum(ModerationDecision)
  decision!: ModerationDecision;

  @IsOptional()
  @IsString()
  reason?: string;
}
