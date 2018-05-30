import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { Schema } from 'mongoose';
import {SchoolsRegionService} from './schools-region.service';
import {CreateSchoolsRegionDto} from './dto/create-schools-region.dto';
import {SchoolsRegion} from './interfaces/schools-region.interface';
import ObjectId = Schema.Types.ObjectId;
import { AuthGuard } from '@nestjs/passport';

@Controller('schools-region')
export class SchoolsRegionController {
  constructor(private readonly schoolsRegionService: SchoolsRegionService) {
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createSchoolsRegionDto: CreateSchoolsRegionDto) {
    return this.schoolsRegionService.create(createSchoolsRegionDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: ObjectId, @Body() createSchoolsRegionDto: CreateSchoolsRegionDto): Promise<SchoolsRegion> {
    return this.schoolsRegionService.update(id, createSchoolsRegionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: ObjectId): Promise<any> {
    return this.schoolsRegionService.remove(id);
  }

  @Get()
  async findAll(@Query('region_id') regionId: ObjectId, @Query('type') type: number): Promise<SchoolsRegion[]> {
    return this.schoolsRegionService.findAll(regionId, type);
  }
}
