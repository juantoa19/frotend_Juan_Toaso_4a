import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Formulario reactivo para registro
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    telefono: new FormControl(''),
  });

  // Función para registrar usuario
  funRegistrar() {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.registroConNest(this.registerForm.value).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Tu cuenta ha sido creada.',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/auth/login']); // Redirigir a login después del registro
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: 'Hubo un problema con el registro. Intenta nuevamente.',
        });
        console.error(error);
      }
    );
  }
}