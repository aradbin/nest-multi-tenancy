import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePackageDto {
    @IsOptional()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsNumber()
    duration: number;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    created_at: string;

    @IsOptional()
    @IsInt()
    created_by: number;
}