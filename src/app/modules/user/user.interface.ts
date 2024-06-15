import { USER_ROLE } from './user.const';

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
}

export type TUserExtends = Document &
  TUser & {
    comparePassword(candidatePassword: string): Promise<boolean>;
  };

export type TUserRole = keyof typeof USER_ROLE;
