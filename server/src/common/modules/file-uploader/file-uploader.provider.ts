import { FactoryProvider } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import config from '../../../config';

export const FILE_UPLOADER = 'FILE_UPLOADER';

export const FileUploaderProvider: FactoryProvider = {
  provide: FILE_UPLOADER,
  inject: [config.KEY],
  useFactory: (configService: ConfigType<typeof config>) => {
    cloudinary.config({
      cloud_name: configService.cloudinary.cloudName,
      api_key: configService.cloudinary.apiKey,
      api_secret: configService.cloudinary.apiSecret,
      secure: true,
    });
  },
};
