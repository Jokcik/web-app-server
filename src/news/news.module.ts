import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsProviders } from './news.providers';
import { DatabaseModule } from '../database/database.module';
import * as passport from 'passport';

const routes: any[] = [
  { path: '/news*', method: RequestMethod.POST },
  { path: '/news*', method: RequestMethod.PUT },
  { path: '/news*', method: RequestMethod.DELETE },
];

@Module({
  imports: [DatabaseModule],
  controllers: [NewsController],
  providers: [
    NewsService,
    ...NewsProviders,
  ],
})
export class NewsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(passport.initialize()).with().forRoutes(...routes);
    consumer.apply(passport.authenticate('jwt', { session: false })).forRoutes(...routes);
  }
}
