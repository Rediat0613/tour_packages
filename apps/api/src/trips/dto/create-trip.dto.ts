import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { PricingMode, TripCategory, TripKind } from '@prisma/client';
import { TripImageMetadataDto } from './trip-image-metadata.dto';

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  summary!: string;

  @IsString()
  @IsNotEmpty()
  itinerary!: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  destinations!: string[];

  @IsInt()
  @Min(1)
  durationDays!: number;

  @IsEnum(TripKind)
  kind!: TripKind;

  @IsEnum(TripCategory)
  category!: TripCategory;

  @IsArray()
  @IsString({ each: true })
  religiousTags!: string[];

  @IsEnum(PricingMode)
  pricingMode!: PricingMode;

  @IsOptional()
  @IsInt()
  @Min(0)
  startingPriceCents?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsArray()
  @IsInt({ each: true })
  departureMonths!: number[];

  @IsArray()
  @IsString({ each: true })
  inclusions!: string[];

  @IsArray()
  @IsString({ each: true })
  exclusions!: string[];

  @IsString()
  @IsNotEmpty()
  cancellationPolicy!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TripImageMetadataDto)
  @ArrayMinSize(3)
  images!: TripImageMetadataDto[];
}
