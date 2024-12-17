import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://127.0.0.1:3000"; // Asegúrate de usar la URL correcta

  private http = inject(HttpClient);

  constructor() { }

  // Método para iniciar sesión
  loginConNest(credenciales: any) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, credenciales); 
  }

  // Método para registrar un nuevo usuario
  registroConNest(datos: any) {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, datos);  // Cambié /register por /auth/register
  }

  // Método para solicitar restablecimiento de contraseña
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/forgot-password`, { email }); // Comillas invertidas
  }
  // Método para restablecer la contraseña
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/reset-password?token=${token}`, { newPassword });
  }
}