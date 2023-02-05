import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { IsUuidOrNull } from 'src/track/validators/track-validators';

export class AlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  year: number;

  @IsUuidOrNull()
  artistId: string | null; // refers to Artist
}
