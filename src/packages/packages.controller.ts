import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UnprocessableEntityException, Query, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { Response } from 'express';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PackagesService } from './packages.service';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  async create(@Body() createPackageDto: CreatePackageDto) {
    try {
      const data = await this.packagesService.create(createPackageDto);
      return {
        message: 'New Package Created Successfully',
        data: data
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  @Get()
  async findAll(@Query() query: any) {
    return await this.packagesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const data = await this.packagesService.findOne(id);
    if(data){
      return response.status(HttpStatus.OK).send(data)
    }else{
      return response.status(HttpStatus.NOT_FOUND).send({
        message: 'No Package Found'
      })
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePackageDto: UpdatePackageDto) {
    try {
      await this.packagesService.update(id, updatePackageDto);
      return {
        message: 'Package Updated Successfully',
        data: id
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.packagesService.remove(id);
      return {
        message: 'Package Deleted Successfully',
        data: id
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }
}
