import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductApiBDocument = HydratedDocument<ProductApiB>;

@Schema()
export class ProductApiB {
    @Prop({ required: true })
    Title: string;


}

export const ProductApiBSchema = SchemaFactory.createForClass(ProductApiB);

