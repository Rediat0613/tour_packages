import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsString()
  tripId!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  score!: number;
}
