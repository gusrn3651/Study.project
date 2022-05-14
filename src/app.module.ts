import { Module } from '@nestjs/common';
import { donotcall_11410 } from './module/public/donotcall/donotcall_11410';
import { donotcall_11411 } from './module/public/donotcall/donotcall_11411';
import { publicModule } from './module/public/public.module';
import { publicController } from './module/public/public.controller';
import { publicService } from './module/public/public.service';

@Module({
  //imports: [publicModule],
  controllers: [publicController],
  providers: [publicService, donotcall_11410, donotcall_11411],
  //providers: [publicService],
})
export class AppModule {}
