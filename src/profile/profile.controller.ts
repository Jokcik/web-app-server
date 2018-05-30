import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {ProfileService} from './profile.service';
import {Profile} from './interfaces/profile.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profilesService: ProfileService) {
  }

  @Post()
  async login(@Body() auth: any) {
    return this.profilesService.login(auth);
  }

  @Post('register')
  @UseGuards(AuthGuard('jwt'))
  async register(@Body() user: any, @Request() req) {
    return this.profilesService.register(req.user, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt', {}))
  async getUser(@Request() req): Promise<Profile> {
    return await this.profilesService.getUser(req.user);
  }
}
