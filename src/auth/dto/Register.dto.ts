import { IsOptional, IsString } from "class-validator";

export class RegisterDto {
    @IsString()
    name: string;

    @IsString()
    prefix: string;

    @IsOptional()
    @IsString()
    contact: string;

    @IsOptional()
    @IsString()
    address: string;
    
    @IsString()
    email: string;

    @IsString()
    password: string;
}
