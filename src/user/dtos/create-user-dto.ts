import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsMobilePhone('pt-BR')
  phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'invalid password' })
  password: string;
}
