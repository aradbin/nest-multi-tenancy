import { PartialType } from "@nestjs/mapped-types";
import { CreatePackageDto } from "./create-package.dto";

export class UpdatePackageDto extends PartialType(CreatePackageDto) {
    updated_at: string;
    updated_by: number;
    deleted_at: string;
    deleted_by: number;
}