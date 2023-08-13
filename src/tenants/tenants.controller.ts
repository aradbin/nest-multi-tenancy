import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UnprocessableEntityException, Query, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { Response } from 'express';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  async create(@Body() createTenantDto: CreateTenantDto) {
    try {
      const data = await this.tenantsService.create(createTenantDto);
      return {
        message: 'New Tenant Created Successfully',
        data: data
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  @Get()
  async findAll(@Query() query: any) {
    return await this.tenantsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const data = await this.tenantsService.findOne(id);
    if(data){
      return response.status(HttpStatus.OK).send(data)
    }else{
      return response.status(HttpStatus.NOT_FOUND).send({
        message: 'No Tenant Found'
      })
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTenantDto: UpdateTenantDto) {
    try {
      await this.tenantsService.update(id, updateTenantDto);
      return {
        message: 'Tenant Updated Successfully',
        data: id
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.tenantsService.remove(id);
      return {
        message: 'Tenant Deleted Successfully',
        data: id
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }
}
