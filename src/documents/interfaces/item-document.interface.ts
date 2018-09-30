import { Document } from 'mongoose';

export interface ItemDocument extends Document {
  title: string;
  url: string;
}
