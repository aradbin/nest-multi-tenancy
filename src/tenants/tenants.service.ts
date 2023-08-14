import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { ModelClass } from 'objection';
import { TenantModel } from './tenant.model';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/users/user.model';

@Injectable()
export class TenantsService {
  constructor(
    @Inject('TenantModel') private modelClass: ModelClass<TenantModel>,
    @Inject('UserModel') private userModelClass: ModelClass<UserModel>,
    @Inject('KnexConnection') private readonly knex: Knex,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    let tenant = await this.findByPrefix(createTenantDto.prefix)
    if(tenant){
      throw new NotAcceptableException('Company prefix already exists')
    }

    tenant = await this.modelClass.query().insert({ name: createTenantDto.name, prefix: createTenantDto.prefix, contact: createTenantDto.contact, address: createTenantDto.address});

    await this.knex.schema.createSchema(createTenantDto.prefix).createTableLike(`${createTenantDto.prefix}.users`,'demo.users')

    const hash = bcrypt.hashSync(createTenantDto.password, 10);

    await this.userModelClass.query().withSchema(createTenantDto.prefix).insert({ name: createTenantDto.name, email: createTenantDto.email, password: hash, contact: createTenantDto.contact });

    return tenant
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
