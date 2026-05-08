import { IsOptional, IsString } from 'class-validator';

export class VerifyAgencyDto {
  @IsOptional()
  @IsString()
  reason?: string;
}
