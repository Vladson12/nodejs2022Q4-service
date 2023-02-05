import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class ArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsDefined()
  grammy: boolean;
}
