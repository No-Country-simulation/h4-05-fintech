import { SetMetadata } from '@nestjs/common';

export const GOOGLE_CALLBACK = 'google_callback';

export const GoogleCallback = () => SetMetadata(GOOGLE_CALLBACK, true);
