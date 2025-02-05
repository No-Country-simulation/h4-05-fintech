import { Request } from 'express';

export interface JwtPayload {
  id: string;
}

export interface UserRequest extends Request {
  user: JwtPayload;
}
