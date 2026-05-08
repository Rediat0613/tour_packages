import { IsEmail, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  tripId!: string;

  @IsString()
  fullName!: string;

  @IsString()
  phone!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsInt()
  @Min(1)
  numberOfTravelers!: number;

  @IsString()
  preferredDates!: string;

  @IsString()
  nationalityResidence!: string;

  @IsString()
  message!: string;
}
