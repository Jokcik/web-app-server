import { Inject, Injectable } from '@nestjs/common';
import { DocumentsModelToken } from '../constants';
import { Model } from 'mongoose';
import { Documents } from './interfaces/documents.interface';
import { CreateDocumentsDto } from './dto/create-documents.dto';
import { CreateItemDocumentDto } from './dto/create-item-document.dto';

@Injectable()
export class DocumentsService {
  constructor(@Inject(DocumentsModelToken) private readonly documentsModel: Model<Documents>) {
  }

  public async getDocuments() {
    return this.documentsModel.find();
  }

  public async createDocument(document: CreateDocumentsDto) {
   return this.documentsModel.create(document);
  }

  public async updateDocument(documentId: string, document: CreateDocumentsDto) {
    return this.documentsModel.findByIdAndUpdate(documentId, { title: document.title }, { new: true });
  }

  public async deleteDocument(_id: string) {
    return this.documentsModel.remove({ _id });
  }

  public async createDocumentItem(documentId: string, documentItem: CreateItemDocumentDto) {
    const _id = documentId;
    const item = { title: documentItem.title, url: documentItem.url };
    return this.documentsModel.findOneAndUpdate({ _id }, { $push: { documents: item } }, { new: true });
  }

  public async deleteItemDocument(documentId: string, itemId: string) {
    return this.documentsModel.findByIdAndUpdate( documentId, { $pull: { documents: { _id: itemId } } }, { new: true });
  }
}
