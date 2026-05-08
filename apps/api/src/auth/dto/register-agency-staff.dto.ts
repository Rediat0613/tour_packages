import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterAgencyStaffDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  agencyName!: string;
}
