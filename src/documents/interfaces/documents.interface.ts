import { Document } from 'mongoose';
import { ItemDocument } from './item-document.interface';

export interface Documents extends Document {
  title: string;
  documents: ItemDocument;
}
