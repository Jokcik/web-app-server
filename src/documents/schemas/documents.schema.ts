import * as mongoose from 'mongoose';
import * as path from "path";
import {NewsSchema} from '../../news/schemas/news.schema';

export const ItemDocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
});

export const DocumentsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  documents: [ItemDocumentSchema]
});

DocumentsSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});

DocumentsSchema.methods = {

  // toJSON() {
  // }
};
