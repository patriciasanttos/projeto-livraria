import { Express } from 'express';
import { DecodedUserTokenType } from './decodedUserToken.type';

declare global {
  namespace Express {
    interface Request {
      token: DecodedUserTokenType | null;
    }
  }
}
