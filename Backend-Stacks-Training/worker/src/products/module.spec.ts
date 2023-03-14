import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsApiBController } from './products.controller';
import { ProductApiBService } from './shared/product.service/product.service';
import { ProductsApiBModule } from './products.module';

describe('ProductsApiBModule', () => {
  let productsApiBController: ProductsApiBController;
  let productApiBService: ProductApiBService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/test'),
        ProductsApiBModule,
      ],
      providers: [ProductApiBService],
    }).compile();

    productsApiBController = moduleRef.get<ProductsApiBController>(
      ProductsApiBController,
    );
    productApiBService = moduleRef.get<ProductApiBService>(ProductApiBService);
  });

  describe('ProductsApiBController', () => {
    it('should be defined', () => {
      expect(productsApiBController).toBeDefined();
    });
  });

  describe('ProductApiBService', () => {
    it('should be defined', () => {
      expect(productApiBService).toBeDefined();
    });
  });
});
