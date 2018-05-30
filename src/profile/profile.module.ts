import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {ProfileController} from './profile.controller';
import {ProfileService} from './profile.service';
import {ProfileProviders} from './profile.providers';
import {DatabaseModule} from '../database/database.module';
import {AuthService} from '../authenticate/auth.service';
import * as passport from 'passport';

const routes: any[] = [
  { path: '/profiles', method: RequestMethod.GET },
  { path: '/profiles/register', method: RequestMethod.POST },
];

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [
    AuthService,
    ProfileService,
    ...ProfileProviders,
  ],
})
export class ProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(passport.initialize()).with().forRoutes(...routes);
    consumer.apply(passport.authenticate('jwt', { session: false, failWithError: true})).forRoutes(...routes);
  }
}
