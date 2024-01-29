export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  publicationsCount: number;
  subscribersCount: number;
  createdAt?: Date;
}

export interface AuthUser extends User {
  passwordHash: string;
}
