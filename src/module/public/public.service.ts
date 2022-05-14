import { Injectable } from '@nestjs/common';
import { donotcall } from './public.dto';
import { donotcall_11410 } from './donotcall/donotcall_11410';
import { donotcall_11411 } from './donotcall/donotcall_11411';

@Injectable()
export class publicService {
  constructor(
    private donotcall_11410: donotcall_11410,
    private donotcall_11411: donotcall_11411,
  ) {}

  // async function name(params:type) {
  async start_donotcall(serviceCode: donotcall, requestBody) {
    switch (serviceCode) {
      case donotcall.UNSUB_REGI:
        await this.donotcall_11410.startScraping(requestBody);
        break;
      case donotcall.UNSUB_REGI2:
        await this.donotcall_11411.startScraping(requestBody);
        break;
      default:
        //TODO response Error Status Add
        console.log('잘못된 접근입니다.');
        return;
    }

    return;
  }
}
