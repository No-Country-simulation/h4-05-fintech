import { extname } from 'node:path';

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnsupportedMediaTypeException,
  Type,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ConfigService } from '@nestjs/config';
import { diskStorage, memoryStorage } from 'multer';
import { Observable } from 'rxjs';

import { Environment } from '../enums';
import { UserRequest, IFileRequirements } from '../interfaces';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  private fileInterceptor: Type<NestInterceptor>;
  private nodeEnv: string;

  private developmentConfig(
    folder: string,
    fileSize: number,
    formats: string[],
    error: string,
  ): MulterOptions {
    return {
      limits: { fileSize },
      fileFilter: (_req, file, cb) => {
        const match = formats.some((format) => format === file.mimetype);
        if (match) cb(null, true);
        else cb(new UnsupportedMediaTypeException(error), false);
      },
      storage: diskStorage({
        destination: `uploads/${folder}`,
        filename: (req: UserRequest, file, callback) => {
          const ext = extname(file.originalname);
          const filename = `${req.user.id}${ext}`;
          callback(null, filename);
        },
      }),
    };
  }

  private productionConfig(fileSize: number, formats: string[], error: string): MulterOptions {
    return {
      limits: { fileSize },
      fileFilter: (_req, file, cb) => {
        const match = formats.some((format) => format === file.mimetype);
        if (match) cb(null, true);
        else cb(new UnsupportedMediaTypeException(error), false);
      },
      storage: memoryStorage(),
    };
  }

  constructor(file: IFileRequirements) {
    this.nodeEnv = new ConfigService().get('NODE_ENV');
    this.fileInterceptor =
      this.nodeEnv === Environment.PRODUCTION
        ? FileInterceptor(
            file.fieldName,
            this.productionConfig(file.fileSize, file.formats, file.error),
          )
        : FileInterceptor(
            file.fieldName,
            this.developmentConfig(file.folder, file.fileSize, file.formats, file.error),
          );
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return new this.fileInterceptor().intercept(context, next);
  }
}
