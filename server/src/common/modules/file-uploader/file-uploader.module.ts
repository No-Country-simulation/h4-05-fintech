import { Global, Module } from '@nestjs/common';
import { FileUploaderProvider } from './file-uploader.provider';

@Global()
@Module({
  providers: [FileUploaderProvider],
  exports: [],
})
export class FileUploaderModule {}
