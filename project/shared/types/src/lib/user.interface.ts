export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  registerDate: Date;
  publicationsCount: number;
  subscribersCount: number;
}

export interface AuthUser extends User {
  passwordHash: string;
}
