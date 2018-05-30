import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {
  }

  async createToken(user) {
    const secretOrKey = 'bgiikod';
    const token = jwt.sign(user, secretOrKey, { expiresIn: '1y' });
    return {
      expires_in: '1y',
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<boolean> {
    return true;
  }
}
