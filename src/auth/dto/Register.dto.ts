import { IsEmail, IsString } from "class-validator";

export class RegisterDto {
    @IsString()
    name: string;

    @IsString()
    prefix: string;
    
    @IsString()
    email: string;

    @IsString()
    password: string;
}
