import { SetMetadata } from '@nestjs/common';

export const IS_WEBSOCKETS = 'IS_WEBSOCKETS';

export const IsWebSockets = () => SetMetadata(IS_WEBSOCKETS, true);
