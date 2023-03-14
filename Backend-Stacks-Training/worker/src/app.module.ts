import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsApiBModule } from './products/products.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-ioredis';

config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URL),
    ProductsApiBModule,
    CacheModule.registerAsync({
      useFactory: () => {
        return {
          store: redisStore,
          host: 'localhost',
          port: '6379',
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
