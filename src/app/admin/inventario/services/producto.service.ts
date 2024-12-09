import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = environment.urlServidor
  private http=inject(HttpClient)

    funListar2(){
    return this.http.get(`${this.baseUrl}/producto/back`)
  }

  funGuardar2(producto:any){
    return this.http.post(`${this.baseUrl}/producto`, producto)
  }

  funModificar2(id:number, producto:any){
    return this.http.patch(`${this.baseUrl}/producto/${id}`, producto)
  }

  funEliminar2(id:number){
    return this.http.delete(`${this.baseUrl}/producto/${id}`)
  }

  
  funCategoriaProducto() {
    return this.http.get(`${this.baseUrl}/categoria`)
  }
}