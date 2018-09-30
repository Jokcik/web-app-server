import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateDocumentsDto } from './dto/create-documents.dto';
import { CreateItemDocumentDto } from './dto/create-item-document.dto';
import { DeleteDocumentItem } from '../gallery/dto/create-gallery.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {
  }

  @Get()
  async getDocuments() {
    return this.documentsService.getDocuments();
  }

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  async createDocument(@Body() document: CreateDocumentsDto) {
    return this.documentsService.createDocument(document);
  }

  @Put(":id")
  // @UseGuards(AuthGuard('jwt'))
  async updateDocument(@Param("id") documentId: string, @Body() document: CreateDocumentsDto) {
    return this.documentsService.updateDocument(documentId, document);
  }

  @Delete(":id")
  // @UseGuards(AuthGuard('jwt'))
  async removeDocument(@Param("id") documentId: string) {
    return this.documentsService.deleteDocument(documentId);
  }

  @Post(":id/item")
  // @UseGuards(AuthGuard('jwt'))
  async createItemDocument(@Param("id") documentId: string, @Body() itemDocument: CreateItemDocumentDto) {
    return this.documentsService.createDocumentItem(documentId, itemDocument);
  }

  @Delete(":id/item")
  // @UseGuards(AuthGuard('jwt'))
  async deleteItemDocument(@Param("id") documentId: string, @Body() itemDocument: DeleteDocumentItem) {
    return this.documentsService.deleteItemDocument(documentId, itemDocument.itemId);
  }
}
