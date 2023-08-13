import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { PackageModel } from './package.model';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Injectable()
export class PackagesService {
  constructor(
    @Inject('PackageModel') private modelClass: ModelClass<PackageModel>
  ) {}

  async create(createPackageDto: CreatePackageDto) {
    return await this.modelClass.query().insert(createPackageDto);
  }

  async findAll(params: any = {}) {
    return await this.modelClass.query().find().paginate(params)
  }

  async findOne(id: number) {
    return await this.modelClass.query().find().findById(id)
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    return await this.modelClass.query().findById(id).update(updatePackageDto)
  }

  async remove(id: number) {
    return await this.modelClass.query().softDelete(id)
  }
}
