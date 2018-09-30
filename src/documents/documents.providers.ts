import { Connection } from 'mongoose';
import {DbConnectionToken, DocumentsModelName, DocumentsModelToken} from '../constants';
import { DocumentsSchema } from './schemas/documents.schema';

export const GalleryProviders = [
  {
    provide: DocumentsModelToken,
    useFactory: (connection: Connection) => connection.model(DocumentsModelName, DocumentsSchema),
    inject: [DbConnectionToken],
  },
];
