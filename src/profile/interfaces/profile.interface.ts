import { Document } from 'mongoose';
import { SchoolsRegion } from '../../schools-region/interfaces/schools-region.interface';

export interface Profile extends Document {
  readonly id: string;
  readonly surname: string;
  readonly name: string;
  readonly middleName: string;
  readonly role: number;
  readonly nickname: string;
  readonly schools: SchoolsRegion;
}
