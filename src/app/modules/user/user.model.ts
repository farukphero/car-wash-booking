import { Schema, model } from 'mongoose';
import {TUserExtends } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema: Schema<TUserExtends> = new Schema<TUserExtends>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: { type: String, required: [true, 'Password is required'] },
    phone: { type: String, required: [true, 'Phone is required'] },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    address: { type: String, required: [true, 'Address is required'] },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', function (next) {
  if (!this.password) {
    return next(new Error('Please enter password'));
  }

  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(
    this.password as string,
    Number(config.bcrypt_salt_rounds),
    (err: Error | undefined, hash: string) => {
      if (err) {
        return next(err);
      }
      this.password = hash;

      next();
    },
  );
});

userSchema.methods.comparePassword = function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.set('toJSON', {
  transform: function (_doc, ret) {
    delete ret.password;
    return ret;
  },
});
export const User = model<TUserExtends>('User', userSchema);
