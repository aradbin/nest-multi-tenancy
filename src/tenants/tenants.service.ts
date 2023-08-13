import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { TenantModel } from './tenant.model';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(
    @Inject('TenantModel') private modelClass: ModelClass<TenantModel>
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    return await this.modelClass.query().insert(createTenantDto);
  }

  async findAll(params: any = {}) {
    return await this.modelClass.query().find().paginate(params)
  }

  async findOne(id: number) {
    return await this.modelClass.query().find().findById(id)
  }

  async findByPrefix(prefix: string) {
    return await this.modelClass.query().find().where('prefix', prefix).first()
  }

  async update(id: number, updateTenantDto: UpdateTenantDto) {
    return await this.modelClass.query().findById(id).update(updateTenantDto)
  }

  async remove(id: number) {
    return await this.modelClass.query().softDelete(id)
  }
}
