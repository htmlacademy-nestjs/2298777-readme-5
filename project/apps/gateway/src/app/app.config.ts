export enum AppServiceURL {
  User = 'http://localhost:3000/api/auth',
  Blog = 'http://localhost:3001/api/blog',
  File = 'http://localhost:3003/api/file',
  Comment = 'http://localhost:3002/api/comment',
  Subscribe = 'http://localhost:3001/api/subscribe',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
