export interface AuthResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    // role: 'admin' | 'farmaceutico';
  };
}
