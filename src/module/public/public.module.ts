import { Module } from '@nestjs/common';
import { publicController } from './public.controller';
import { publicService } from './public.service';

@Module({
  controllers: [publicController],
  //providers: [publicService, donotcall_11410, donotcall_11411],
  providers: [publicService],
})
export class publicModule {}
