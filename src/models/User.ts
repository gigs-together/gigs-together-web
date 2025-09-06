import { getModelForClass, prop, pre, modelOptions } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

@pre<User>('save', async function () {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
})
@modelOptions({
  schemaOptions: { collection: 'users' },
})
export class User {
  @prop({ required: true, unique: true, type: String })
  public email!: string;

  @prop({ required: true, type: String })
  public password!: string;

  @prop({ required: true, type: String })
  public firstName!: string;

  @prop({ required: true, type: String })
  public lastName!: string;

  @prop({ enum: ['admin', 'moderator', 'user'], default: 'admin', type: String })
  public role!: string;

  @prop({ default: Date.now, type: Date })
  public createdAt!: Date;

  // Instance method to check password
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password || '');
  }
}

// Check if model already exists to prevent OverwriteModelError
export const UserModel = mongoose.models.User || getModelForClass(User);
