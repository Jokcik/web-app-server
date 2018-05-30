import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TeacherProviders } from './teacher.providers';
import { DatabaseModule } from '../database/database.module';
import * as passport from 'passport';

const routes: any[] = [
  { path: '/teacher*',  method: RequestMethod.POST },
  { path: '/teacher*',  method: RequestMethod.PUT },
  { path: '/teacher*',  method: RequestMethod.DELETE },
];

@Module({
  imports: [DatabaseModule],
  controllers: [TeacherController],
  providers: [
    TeacherService,
    ...TeacherProviders,
  ],
})
export class TeacherModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(passport.initialize()).with().forRoutes(...routes);
    consumer.apply(passport.authenticate('jwt', { session: false })).forRoutes(...routes);
  }
}
