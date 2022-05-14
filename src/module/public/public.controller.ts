import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { donotcall } from './public.dto';
import { publicService } from './public.service';

@Controller('/v1.0/public')
export class publicController {
  constructor(private pbService: publicService) {}

  @Post('/donotcall/:number')
  async donotCall(
    @Param('number') serviceCode: donotcall,
    @Body() requestBody,
  ): Promise<any> {
    await this.pbService.start_donotcall(serviceCode, requestBody);

    return globalThis.$sendResultJSON;
  }
}
