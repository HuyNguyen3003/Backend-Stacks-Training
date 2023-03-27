import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':key/:value')
  async getHello(
    @Param('key') key: string,
    @Param('value') value: string,
  ): Promise<string> {
    return this.appService.getHello(key, value) ;
  }
  @Get(':key')
  async getkey(@Param('key') key: string): Promise<string> {
    return this.appService.getkey(key);
  }
}
