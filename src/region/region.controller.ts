import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { Schema } from 'mongoose';
import {RegionService} from './region.service';
import {CreateRegionDto} from './dto/create-regin.dto';
import {Region} from './interfaces/region.interface';
import ObjectId = Schema.Types.ObjectId;
import { AuthGuard } from '@nestjs/passport';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: ObjectId, @Body() createRegionDto: CreateRegionDto): Promise<Region> {
    return this.regionService.update(id, createRegionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: ObjectId): Promise<any> {
    return this.regionService.remove(id);
  }

  @Get()
  async findAll(): Promise<Region[]> {
    return this.regionService.findAll();
  }
}
