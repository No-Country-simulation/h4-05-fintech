import { SetMetadata } from '@nestjs/common';

export const APPLE_CALLBACK = 'apple_callback';

export const AppleCallback = () => SetMetadata(APPLE_CALLBACK, true);
