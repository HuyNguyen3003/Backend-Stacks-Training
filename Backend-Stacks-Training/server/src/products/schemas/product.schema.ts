import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductApiADocument = HydratedDocument<ProductApiA>;

@Schema()
export class ProductApiA {
    @Prop({ required: true })
    Title: string;

}

export const ProductApiASchema = SchemaFactory.createForClass(ProductApiA);

