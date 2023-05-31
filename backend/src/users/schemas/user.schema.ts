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
  confirmationToken?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHashed: string;

  @Prop()
  refreshTokenHashed?: string;

  @Prop()
  changePasswordTokenHashed?: string;

  @Prop({ type: Date })
  changePasswordTokenIssuedAt?: Date;

  @Prop()
  changeEmailTokenHashed?: string;

  @Prop({ type: Date })
  changeEmailTokenIssuedAt?: Date;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserDocument, User, UserSchema };
