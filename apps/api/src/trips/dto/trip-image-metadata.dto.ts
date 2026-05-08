import { IsInt, IsMimeType, IsOptional, IsString, Min } from 'class-validator';

export class TripImageMetadataDto {
  @IsString()
  originalName!: string;

  @IsInt()
  @Min(1)
  size!: number;

  @IsMimeType()
  mimeType!: string;

  @IsOptional()
  @IsString()
  objectKey?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}
