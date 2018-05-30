import {Document} from 'mongoose';
import { Region } from '../../region/interfaces/region.interface';

export interface Person {
  name: string;
  post: string;
  telephone: string;
  stationary: string;
}

export interface SchoolsRegion extends Document{
  title: string;
  region: Region;
  type: number;
  address: string;
  site: string;
  email: string;

  mainPerson: Person;
}

