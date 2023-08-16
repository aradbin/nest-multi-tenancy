import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTenantDto {
    @IsNotEmpty({ message: 'Company name is required' })
    @IsString()
    name: string;
    
    @IsNotEmpty({ message: 'Company prefix is required' })
    @IsString()
    prefix: string;

    @IsOptional()
    @IsString()
    contact: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({},{ message: 'Please provide valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    created_at: string;

    @IsOptional()
    @IsInt()
    created_by: number;
}