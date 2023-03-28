import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, enum: ['male', 'female'], default: 'female' })
  gender: string;

  @Prop({ required: true })
  birthday: Date;
  
  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, enum: ['seller', 'customer'], default: 'customer' })
  role: string;

}

const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre<UserDocument>('save', async function (next: any) {
//     const user = this;
  
//     if (!user.isModified('password')) {
//       return next();
//     }
  
//     try {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(user.password, salt);
//       next();
//     } catch (error) {
//       return next(error);
//     }
//   });
  
  export { UserSchema };

