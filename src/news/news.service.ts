import { Model, Schema } from 'mongoose';
import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { News } from './interfaces/news.interface';
import { NewsModelToken } from '../constants';
import { CreateNewsDto } from './dto/create-news.dto';
import ObjectId = Schema.Types.ObjectId;

@Injectable()
export class NewsService {
  constructor(@Inject(NewsModelToken) private readonly newsModel: Model<News>) {
  }

  @UseGuards(AuthGuard('jwt'))
  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const news = new this.newsModel(createNewsDto);
    return await news.save();
  }

  @UseGuards(AuthGuard('jwt'))
  async remove(id: Schema.Types.ObjectId): Promise<News> {
    return await this.newsModel.findByIdAndRemove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  async update(id: ObjectId, createNewsDto: CreateNewsDto): Promise<News> {
    return await this.newsModel.findByIdAndUpdate(id, createNewsDto, {new: true});
  }

  async findAll(type: number, url: string, page: number, onPage: number, unactual: boolean): Promise<News[]> {
    onPage = onPage || 12;
    page = page || 1;

    let obj = {};
    obj = Object.assign(obj, type ? {type} : {});
    obj = Object.assign(obj, url ? {url} : {});

    let model = this.newsModel.find(obj);
    if (type == 2) {
      const filter = unactual ? {$lte: Date.now()} : {$gte: Date.now()};
      model = model.where({date: filter}).sort({date: unactual ? -1 : 1});
    }

    if (type == 1) {
      model = model.sort({date: -1});
    }

    return await model.skip((page - 1) * onPage).limit(onPage);
  }
}
