import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {CompetitionController} from './competition.controller';
import {CompetitionService} from './competition.service';
import {CompetitionProviders} from './competition.providers';
import {DatabaseModule} from '../database/database.module';
import {OthersProviders} from '../others/others.providers';
import * as passport from 'passport';

const routes: any[] = [
  { path: '/competitions', method: RequestMethod.POST },
  { path: '/competitions', method: RequestMethod.PUT },
  { path: '/competitions', method: RequestMethod.DELETE },
];

@Module({
  imports: [DatabaseModule],
  controllers: [CompetitionController],
  providers: [
    CompetitionService,
    ...CompetitionProviders,
    ...OthersProviders
  ],
})
export class CompetitionModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(passport.initialize()).with().forRoutes(...routes);
    consumer.apply(passport.authenticate('jwt', { session: false, failWithError: true})).forRoutes(...routes);
  }
}
