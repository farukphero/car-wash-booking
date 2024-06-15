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

  