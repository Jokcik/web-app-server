import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {UploadsController} from './uploads.controller';
import {UploadsService} from './uploads.service';
import * as formidable from 'express-formidable';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    return consumer.apply(formidable()).forRoutes('/upload');
  }
}
