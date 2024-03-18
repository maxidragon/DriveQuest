import { IsInt, IsNotEmpty } from 'class-validator';

export class JwtAuthDto {
  @IsNotEmpty()
  @IsInt()
  userId: string;
}
