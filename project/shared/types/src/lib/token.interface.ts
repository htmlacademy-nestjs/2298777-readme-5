export interface TokenPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface Token {
  accessToken: string;
}
