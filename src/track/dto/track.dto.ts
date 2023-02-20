import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class TrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string; // refers to Artist

  @IsOptional()
  @IsUUID()
  albumId: string; // refers to Album

  @IsDefined()
  @IsNumber()
  duration: number; // integer number
}
