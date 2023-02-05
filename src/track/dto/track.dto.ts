import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsUuidOrNull } from '../validators/track-validators';

export class TrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUuidOrNull()
  artistId: string | null; // refers to Artist

  @IsUuidOrNull()
  albumId: string | null; // refers to Album

  @IsDefined()
  @IsNumber()
  duration: number; // integer number
}
