import { Component, OnInit, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { error } from 'console';


interface Categoria {
  id?: number,
  nombreCategoria?: string;
}
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit {
  private categoriaService = inject(CategoriaService)

  categorias: Categoria[] = []
  visible: boolean = false
  ngOnInit(): void {
    this.getCategorias()

  }
  getCategorias() {
    this.categoriaService.funListar().subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (error: any) => {
        console.log(error);
      }
    )



  }
}
