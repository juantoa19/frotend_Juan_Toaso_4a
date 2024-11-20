import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

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
}
