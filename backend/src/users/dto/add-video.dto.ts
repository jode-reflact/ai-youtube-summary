import { IsString } from 'class-validator';

class AddVideoDto {
  @IsString()
  ytVideoUrl: string;
}

export { AddVideoDto };
