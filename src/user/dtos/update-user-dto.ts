import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsMobilePhone('pt-BR')
  phone: string;
}
