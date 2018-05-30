import * as mongoose from 'mongoose';
(<any>mongoose).Promise = global.Promise;
import {DbConnectionToken} from '../constants';

export const databaseProviders = [
  {
    provide: DbConnectionToken,
    useFactory: async () =>
      await mongoose.connect('mongodb://jokcik:19966991@localhost/odbgiik', {useMongoClient: true})
  },
];
