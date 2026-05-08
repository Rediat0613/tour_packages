import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateAgencyDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  website?: string;
}
