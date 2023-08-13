import { PartialType } from "@nestjs/mapped-types";
import { CreateTenantDto } from "./create-tenant.dto";

export class UpdateTenantDto extends PartialType(CreateTenantDto) {
    updated_at: string;
    updated_by: number;
    deleted_at: string;
    deleted_by: number;
}