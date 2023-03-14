import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsApiAController } from './products.controller';
import { ProductApiAService } from './shared/product.service/product.service';
import { ProductsApiAModule } from './products.module';

describe('ProductsApiAModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ProductsApiAModule,
        MongooseModule.forRoot('mongodb://localhost/test'),
      ],
    }).compile();
  });

  it('should be defined', () => {
    const controller: ProductsApiAController =
      module.get<ProductsApiAController>(ProductsApiAController);
    expect(controller).toBeDefined();
  });


  afterAll(async () => {
    await module.close();
  });
});
