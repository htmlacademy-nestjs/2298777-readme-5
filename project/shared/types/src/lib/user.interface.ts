export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  registerDate: Date;
  publicationsCount: number;
  subscribersCount: number;
}

export interface AuthUser extends User {
  passwordHash: string;
}
