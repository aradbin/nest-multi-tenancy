import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UnprocessableEntityException, Query, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { Response } from 'express';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    try {
      const data = await this.subscriptionsService.create(createSubscriptionDto);
      return {
        message: 'New Subscription Created Successfully',
        data: data
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  @Get()
  async findAll(@Query() query: any) {
    return await this.subscriptionsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const data = await this.subscriptionsService.findOne(id);
    if(data){
      return response.status(HttpStatus.OK).send(data)
    }else{
      return response.status(HttpStatus.NOT_FOUND).send({
        message: 'No Subscription Found'
      })
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    try {
      await this.subscriptionsService.update(id, updateSubscriptionDto);
      return {
        message: 'Subscription Updated Successfully',
        data: id
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.subscriptionsService.remove(id);
      return {
        message: 'Subscription Deleted Successfully',
        data: id
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }
}
