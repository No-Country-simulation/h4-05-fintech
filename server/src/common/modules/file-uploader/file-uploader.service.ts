import { PassThrough } from 'node:stream';

import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';

import config from '../../../config';

@Injectable()
export class FileUploaderService {
  constructor(@Inject(config.KEY) private readonly configService: ConfigType<typeof config>) {}

  async uploadFile(folder: string, fileName: string, file: Express.Multer.File) {
    const buffer = Buffer.from(file.buffer);
    const bufferStream = new PassThrough();
    const options: UploadApiOptions = {
      folder: `${this.configService.cloudinary.mainFolder}/${folder}`,
      public_id: fileName,
      unique_filename: true,
      overwrite: true,
    };

    return new Promise<UploadApiResponse | UploadApiErrorResponse | undefined>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
          if (error) reject(error);
          resolve(result);
        });
        bufferStream.end(buffer).pipe(uploadStream);
      },
    );
  }
}
