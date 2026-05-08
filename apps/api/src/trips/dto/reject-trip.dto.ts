import { IsString } from 'class-validator';

export class RejectTripDto {
  @IsString()
  reason!: string;
}
