import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as express from 'express';
import * as cors from 'express-cors';
import { HttpExceptionFilter } from './exception/http-exception.filter';

declare const module: any;
const corsHttp = ['localhost:3000', 'localhost:4200', 'localhost:8080', 'rumc31.ru:4200', 'rumc31.ru:8080', 'localhost:3001', 'rumc31.ru', '85.143.175.134'];

let s = express();
s.set('port', +process.argv[2] || +process.env.PORT || 3001);

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, s);
  app.use(bodyParser.json());
  app.use(cors({allowedOrigins: corsHttp, headers: ['Content-Type', 'enctype', 'Authorization']}));
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(s.get('port'));
  console.log('star server port ' + s.get('port'));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

