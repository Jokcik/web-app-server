import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {GalleryController} from './gallery.controller';
import {GalleryService} from './gallery.service';
import {GalleryProviders} from './gallery.providers';
import {DatabaseModule} from '../database/database.module';
import {AuthService} from '../authenticate/auth.service';
import * as passport from 'passport';

// const routes: any[] = [
//   { path: '/galleries', method: RequestMethod.POST },
//   { path: '/galleries', method: RequestMethod.PUT },
//   { path: '/galleries', method: RequestMethod.DELETE },
// ];

@Module({
  imports: [DatabaseModule],
  controllers: [GalleryController],
  providers: [
    GalleryService,
    ...GalleryProviders,
  ],
})
export class GalleryModule {
  // configure(consumer: MiddlewareConsumer): void {
  //   consumer.apply(passport.initialize()).with().forRoutes(...routes);
  //   consumer.apply(passport.authenticate('jwt', { session: false, failWithError: true})).forRoutes(...routes);
  // }
}
