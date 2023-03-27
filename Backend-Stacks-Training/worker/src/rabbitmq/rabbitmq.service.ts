import { Injectable } from '@nestjs/common';
import { Channel, connect } from 'amqplib';
import { config } from 'dotenv';
import { ProductApiBService } from 'src/products/shared/product.service/product.service';
import { ProductApiB } from 'src/products/shared/product/product';
import axios from 'axios';
import * as crypto from 'crypto';

config();

@Injectable()
export class ReadMessageChannel {
  private _channel: Channel;
  private _service: ProductApiBService;

  private async _createMessageChannel() {
    try {
      const connection = await connect(process.env.AMQP_SERVER);
      this._channel = await connection.createChannel();
      this._channel.assertQueue(process.env.QUEUE_NAME);
      console.log('Connected to Queue.');
    } catch (err) {
      console.log('Connect to RabbitMQ queue failed.');
      console.log(err);
    }
  }

  async consumeMessages() {
    await this._createMessageChannel();

    if (this._channel) {
      this._channel.consume(process.env.QUEUE_NAME, async (Title) => {
        const obj = JSON.parse(Title.content.toString());
        const now = new Date();
        const formattedDate = now.toLocaleString('en-US', { timeZone: 'UTC' });
        obj.Timestamp = formattedDate.toString();
        this._channel.ack(Title);
        const product: ProductApiB = obj;
        console.log('Message read: ', product);
        const _id = crypto.randomBytes(20).toString('hex');

        await axios.put(`http://localhost:9200/datames/_doc/${_id}`, product);

        const url = 'http://localhost:9200/datames/_search';
        const data = {
          query: {
            match_phrase: {
              Title: {
                query: 'abc ', // msg can tim
                slop: '1',
              },
            },
          },
          _source: 'Title',
        };

        await axios
          .post(url, data)
          .then((response) => {
            const stringtitle = response.data.hits.hits
              .map((item) => item._source.Title)
              .join(', ');

            axios.get(`http://localhost:2001/dataSearch/${stringtitle}`);
          })
          .catch((error) => {
            console.error(error);
          });
      });

      console.log('Product consumer started');
    }
  }
}
