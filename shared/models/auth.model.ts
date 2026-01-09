// Modelo básico do usuário que será reutilizado em várias partes do sistema
export interface User {
  id: string;
  name: string;
  email: string;
  role: EnumRoleType;
  avatarUrl?: string; // Opcional
}

export interface EnumRoleType {
  SYSTEM_ADMIN: 'SYSTEM_ADMIN';
  ADMIN: 'ADMIN';
  MANAGER: 'MANAGER';
  USER: 'USER';
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expiresIn: number; // Ex: tempo em segundos para expiração do token
}

/**
 * Interface genérica para respostas de erro da sua API
 * para padronizar o tratamento no BaseService
 */
export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  message: string;
  errors?: string[]; // Para erros de validação múltiplos
}
