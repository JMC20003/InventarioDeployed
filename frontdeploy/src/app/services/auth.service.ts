import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface AuthRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  password: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
}

interface JwtPayload {
  sub: string;
  roles: string[];
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';
  private localStorage ="";
  constructor(private http: HttpClient) { }

  login(data: AuthRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  cerrarSesion() {
    localStorage.removeItem('token');
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  getUserRole(): string[] {
  const token = localStorage.getItem('token');
  if (!token) return [];
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.roles || [];
  } catch (error) {
    console.error('Token inválido', error);
    return [];
  }
}

hasRole(role: string): boolean {
  return this.getUserRole().includes(role);
}

  isAdmin(): boolean {
    return this.getUserRole().includes('ROLE_ADMIN');
  }
}
