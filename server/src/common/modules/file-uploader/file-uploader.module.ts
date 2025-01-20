import { Global, Module } from '@nestjs/common';
import { FileUploaderProvider } from './file-uploader.provider';
import { FileUploaderService } from './file-uploader.service';

@Global()
@Module({
  providers: [FileUploaderProvider, FileUploaderService],
  exports: [FileUploaderService],
})
export class FileUploaderModule {}
