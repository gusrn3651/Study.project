import { Module } from '@nestjs/common';
import { donotCall0001 } from './module/donotcall/0001/donotcall_0001_01';
import { DonotcallController } from './module/donotcall/donotcall.controller';
import { DonotcallService } from './module/donotcall/donotcall.service';

@Module({
  imports: [],
  controllers: [DonotcallController],
  providers: [DonotcallService,donotCall0001],
})
export class AppModule {}
