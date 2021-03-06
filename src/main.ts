import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'express-cors';
import * as opt from 'optimist';

const argv = opt
  .usage('Usage: $0 --port [num]')
  .demand(['port'])
  .argv;


const corsHttp = ['localhost:3000', 'localhost:4200', 'localhost:8080', 'rumc31.ru:4200', 'rumc31.ru:8080', 'localhost:3001', 'rumc31.ru', '85.143.175.134'];

console.log(process.argv);
let s = express();
s.set('port', argv.port || +process.argv[2] || +process.env.PORT || 3001);

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, s);
  app.use(bodyParser.json());
  app.use(cors({allowedOrigins: corsHttp, headers: ['Content-Type', 'enctype', 'Authorization']}));
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(s.get('port'));
  console.log('star server port ' + s.get('port'))
}
bootstrap();

