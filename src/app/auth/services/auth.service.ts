import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl="http://127.0.0.1:3000" //solo para pruebas deberia ir "http://127.0.0.1:3000"

  private http=inject(HttpClient)

  constructor() { }

  loginConNest(credenciales: any){
    return this.http.post<any>(`${this.baseUrl}/auth/login`, credenciales); 
  }

  registroConNest(datos: any){
    return this.http.post<any>(`${this.baseUrl}/register`,datos);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/forgot-password`, { email });
  }

  // Método para restablecer la contraseña
  resetPassword(token: string, newPassword: string): Observable<any> {
    // Aquí pasamos el token como parámetro en la URL y la nueva contraseña en el cuerpo
    return this.http.post<any>(`${this.baseUrl}/auth/reset-password?token=${token}`, { newPassword });
  }
  
}
