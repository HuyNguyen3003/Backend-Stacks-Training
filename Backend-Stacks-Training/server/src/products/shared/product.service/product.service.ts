import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProductApiA } from '../product/product';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { createMessageChannel } from '../../../rabbitmq/rabbitmq.service';

@Injectable()
export class ProductApiAService {
  constructor(
    @InjectModel('ProductApiA')
    private readonly productApiAModel: Model<ProductApiA>,
  ) {}

  validatorData(data: ProductApiA) {
    if (!data.Title)
      throw new HttpException(
        `Product name not informed.`,
        HttpStatus.BAD_REQUEST,
      );

    return true;
  }

  async getByName(name: string) {
    const check = await this.productApiAModel.find({ Title: name }).exec();

    if (check.length > 0) {
      throw new HttpException(
        `Product '${name}' already registered in API A database, change the name to continue.`,
        HttpStatus.CONFLICT,
      );
    }

    return true;
  }

  async create(data: ProductApiA) {
    const validateObj = this.validatorData(data);
    if (validateObj) {
      const allData = await this.getByName(data.Title);
      if (allData) {
        const dataJson = JSON.stringify(data);
        const messageChannel = await createMessageChannel();
        messageChannel.sendToQueue(
          process.env.QUEUE_NAME,
          Buffer.from(dataJson),
        );
        console.log('Data enqueued', dataJson);
        const createdProduct = new this.productApiAModel(data);
        return await createdProduct.save();
      }
    }
  }
}
