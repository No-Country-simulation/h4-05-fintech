export interface IApiError {
  error: string;
  message: string;
  statusCode: number;
}

export enum ApiErrorMessages {
  USER_NOT_FOUND = 'user not found',
  REGISTERED_USER = 'user already registered',
  INVALID_CREDENTIALS = 'invalid credentials',
  USER_NOT_VERIFIED = 'user not verified',
  EXPIRED_TIME = 'expired time',
  USER_BLOCKED = 'user blocked',
  INVALID_CODE = 'invalid 32-digit code',
  UNSUPPORTED_FILE = 'unsupported file',
}