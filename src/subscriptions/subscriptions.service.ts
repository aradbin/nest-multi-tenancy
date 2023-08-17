import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { SubscriptionModel } from './subscription.model';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @Inject('SubscriptionModel') private modelClass: ModelClass<SubscriptionModel>
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    return await this.modelClass.query().insert(createSubscriptionDto);
  }

  async findAll(params: any = {}) {
    return await this.modelClass.query().find().paginate(params)
  }

  async findOne(id: number) {
    return await this.modelClass.query().find().findById(id)
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return await this.modelClass.query().findById(id).update(updateSubscriptionDto)
  }

  async remove(id: number) {
    return await this.modelClass.query().softDelete(id)
  }
}
