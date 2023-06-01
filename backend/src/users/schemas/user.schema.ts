import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

type UserDocument = HydratedDocument<User>;

@Schema()
class User {
  id: Types.ObjectId;

  @Prop({ required: true })
  registeredAt: Date;

  @Prop({ required: true, default: false })
  isConfirmed: boolean;

  @Prop({ type: Date })
  confirmationTokenIssuedAt?: Date;

  @Prop()
  confirmationTokenHash?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop()
  refreshTokenHash?: string;

  @Prop()
  passwordResetTokenHash?: string;

  @Prop({ type: Date })
  passwordResetTokenIssuedAt?: Date;

  @Prop()
  changeEmailTokenHash?: string;

  @Prop({ type: Date })
  changeEmailTokenIssuedAt?: Date;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserDocument, User, UserSchema };
