import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import {Schema} from 'mongoose';
import {NewsService} from './news.service';
import {CreateNewsDto} from './dto/create-news.dto';
import {News} from './interfaces/news.interface';
import ObjectId = Schema.Types.ObjectId;
import { AuthGuard } from '@nestjs/passport';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: ObjectId) {
    return this.newsService.remove(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: ObjectId, @Body() createNewsDto: CreateNewsDto): Promise<News> {
    return this.newsService.update(id, createNewsDto);
  }

  @Get()
  async findAll(@Query() query: any): Promise<News[]> {
    return this.newsService.findAll(query.type, query.url, +query.page, +query.onPage, !!query.unactual);
  }
}
