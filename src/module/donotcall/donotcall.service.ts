import { Injectable } from '@nestjs/common';
import { donotCall0001 } from './0001/donotcall_0001_01';

@Injectable()
export class DonotcallService {

    constructor(private donotcall_0001 : donotCall0001) {}

    // async function name(params:type) {
    donotCall_1() {
        console.log("AAA");
        return this.donotcall_0001.startScraping();
    }
    // }

}
