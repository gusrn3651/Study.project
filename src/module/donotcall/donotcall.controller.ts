import { Controller, Get } from '@nestjs/common';
import { DonotcallService } from './donotcall.service';

@Controller('donotcall')
export class DonotcallController {

    constructor(private donotCall:DonotcallService) {};    


    @Get('')
    async donotCall_1() : Promise<string>{
        return this.donotCall.donotCall_1();
        return 'abc';
    }

}
