import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends Strategy {
  constructor() {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: 'bgiikod',
        ignoreExpiration: true
      },
      async (req, payload, next) => await this.verify(req, payload, next)
    );
    passport.use(this);
  }


  public async verify(req: Request, user, done) {
    done(null, user);
  }
}
