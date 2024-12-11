import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Variable para manejar el estado del checkbox "Recuérdame"
  rememberMe: boolean = false; 

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  funIngresar() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.loginConNest(this.loginForm.value).subscribe(
      (res) => {
        // Validar si la respuesta contiene un token
        if (res && res.token) {
          // Si "Recuérdame" está marcado, almacenar el token en localStorage
          if (this.rememberMe) {
            localStorage.setItem('authToken', res.token);
          } else {
            sessionStorage.setItem('authToken', res.token);
          }

          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido al sistema.',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/admin']); // Navegar solo si el login es exitoso
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Credenciales inválidas',
            text: 'Por favor, verifica tu correo y contraseña.',
          });
        }
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'warning',
          title: 'Credenciales inválidas',
          text: 'Revisa tus datos e inténtalo nuevamente.',
          footer: '<a href="/forgot-password">¿Olvidaste tu contraseña?</a>'
        });
      }
    );
  }
}
