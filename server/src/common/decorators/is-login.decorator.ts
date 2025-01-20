import { SetMetadata } from '@nestjs/common';

export const IS_LOGIN = 'IS_LOGIN';

export const IsLogin = () => SetMetadata(IS_LOGIN, true);
