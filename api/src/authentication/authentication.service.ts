import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { DecodedUserTokenType } from 'src/@types/decodedUserToken.type';

@Injectable()
export class AuthService {
  validateToken(token: string): DecodedUserTokenType | null {
    try {
      const decodedJwt = jwt.verify(token, process.env.JWT_KEY as string);
      if (!decodedJwt) return null;

      return decodedJwt as DecodedUserTokenType;
    } catch (err) {
      return null;
    }
  }
}
