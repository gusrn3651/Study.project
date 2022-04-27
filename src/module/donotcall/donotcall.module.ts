import { Module } from '@nestjs/common';
import { donotCall0001 } from './0001/donotcall_0001_01';
import { DonotcallController } from './donotcall.controller';
import { DonotcallService } from './donotcall.service';

@Module({  
  controllers: [DonotcallController],
  providers: [DonotcallService]
})
export class DonotcallModule {}
