import { getModelForClass, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

export class Event {
  @prop({ required: true, type: String })
  public date!: string;

  @prop({ required: true, type: String })
  public cover!: string;

  @prop({ required: true, type: String })
  public title!: string;

  @prop({ required: true, type: Number })
  public people!: number;

  @prop({ required: true, type: String })
  public venueAddress!: string;

  @prop({ default: false, type: Boolean })
  public published!: boolean;

  @prop({ type: String })
  public ticketmasterId?: string;
}

// Check if model already exists to prevent OverwriteModelError
export const EventModel = mongoose.models.Event || getModelForClass(Event); 