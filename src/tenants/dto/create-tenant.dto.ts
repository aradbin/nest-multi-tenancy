import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTenantDto {
    @IsOptional()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    prefix: string;

    @IsOptional()
    @IsString()
    contact: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    created_at: string;

    @IsOptional()
    @IsInt()
    created_by: number;
}