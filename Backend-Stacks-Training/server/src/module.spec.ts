import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

describe('AppModule', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URL),
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appService.getHello()).toBe('Hello World!');
    });
  });
});
