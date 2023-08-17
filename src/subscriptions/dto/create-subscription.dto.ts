import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSubscriptionDto {
    @IsNotEmpty({ message: 'Tenant is required' })
    @IsInt()
    tenant_id: number;
    
    @IsNotEmpty({ message: 'Package is required' })
    @IsInt()
    package_id: number;

    @IsOptional()
    @IsString()
    expire_at: string;

    @IsOptional()
    @IsString()
    created_at: string;

    @IsOptional()
    @IsInt()
    created_by: number;
}