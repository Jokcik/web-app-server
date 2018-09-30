import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { GalleryProviders } from './documents.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    ...GalleryProviders
  ]
})
export class DocumentsModule {}
