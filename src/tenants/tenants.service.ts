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

    try {
      await this.knex.transaction(async (trx) => {
        tenant = await this.modelClass.query(trx).withSchema('public').insert({ name: createTenantDto.name, prefix: createTenantDto.prefix, contact: createTenantDto.contact, address: createTenantDto.address})

        await trx.raw(`CREATE SCHEMA IF NOT EXISTS ${createTenantDto.prefix}`)

        await trx.schema.createTableLike(`${createTenantDto.prefix}.users`,'demo.users')

        await trx.raw(`
          CREATE SEQUENCE ${createTenantDto.prefix}.users_id_seq;
          ALTER TABLE ${createTenantDto.prefix}.users
          ALTER COLUMN id SET DEFAULT nextval('${createTenantDto.prefix}.users_id_seq'::regclass);
        `)

        const hash = bcrypt.hashSync(createTenantDto.password, 10)

        await this.userModelClass.query(trx).withSchema(createTenantDto.prefix).insert({ name: createTenantDto.name, email: createTenantDto.email, password: hash, contact: createTenantDto.contact })

        return tenant
      })
    } catch (error) {
      throw error
    }

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
    // return await this.modelClass.query().findById(id).update(updateTenantDto)
  }

  async remove(id: number) {
    return await this.modelClass.query().softDelete(id)
  }
}
