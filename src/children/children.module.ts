import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ChildrenController } from './children.controller';
import { ChildrenService } from './children.service';
import { ChildrenProviders } from './children.providers';
import { DatabaseModule } from '../database/database.module';
import * as passport from 'passport';
import { OthersProviders } from '../others/others.providers';
import { RatingService } from './rating/rating';
import { CronService } from '../cron/cron.service';

const routes: any[] = [
  { path: '/children*',  method: RequestMethod.POST },
  { path: '/children*',  method: RequestMethod.PUT },
  { path: '/children*',  method: RequestMethod.DELETE },
];

@Module({
  imports: [DatabaseModule],
  controllers: [ChildrenController],
  providers: [
    ChildrenService,
    RatingService,
    CronService,
    ...ChildrenProviders,
    ...OthersProviders
  ],
})
export class ChildrenModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(passport.initialize()).with().forRoutes(...routes);
    consumer.apply(passport.authenticate('jwt', { session: false })).forRoutes(...routes);
  }
}
