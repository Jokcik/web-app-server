import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [JwtStrategy],
})
export class AuthModule {
}
