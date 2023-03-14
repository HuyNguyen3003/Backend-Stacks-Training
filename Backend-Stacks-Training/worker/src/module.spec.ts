import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { CacheModule} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsApiBModule } from './products/products.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppModule', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });



  it('should register CacheModule', () => {
    const cacheModule = app.get(CacheModule);
    expect(cacheModule).toBeDefined();
  });

  it('should register MongooseModule', () => {
    const mongooseModule = app.get(MongooseModule);
    expect(mongooseModule).toBeDefined();
  });

  it('should register ProductsApiBModule', () => {
    const productsModule = app.get(ProductsApiBModule);
    expect(productsModule).toBeDefined();
  });
  it('should have AppController', () => {
    const controller = app.get<AppController>(AppController);
    expect(controller).toBeDefined();
  });

  it('should have AppService', () => {
    const service = app.get<AppService>(AppService);
    expect(service).toBeDefined();
  });
});
