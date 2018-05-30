import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import {GalleryService} from './gallery.service';
import {CreateGalleryDto} from './dto/create-gallery.dto';
import {Schema} from 'mongoose';
import ObjectId = Schema.Types.ObjectId;
import { AuthGuard } from '@nestjs/passport';

@Controller('galleries')
export class GalleryController {
  constructor(private readonly galleriesService: GalleryService) {
  }

  @Get()
  async findAll() {
    return this.galleriesService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createGallery(@Body() gallery: CreateGalleryDto) {
    return this.galleriesService.createGallery(gallery);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateGallery(@Param('id') id: ObjectId, @Body() gallery: CreateGalleryDto) {
    return this.galleriesService.updateGallery(id, gallery);
  }

  @Delete(':id')
  async removeGallery(@Param('id') id: ObjectId): Promise<any> {
    return this.galleriesService.removeGallery(id);
  }
}
