import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Variable que maneja el estado del checkbox - Recuérdame
  rememberMe: boolean = false;

  // Formulario reactivo
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() {
    // Verifica si está en el entorno del navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      // Recuperar email y contraseña guardados en localStorage
      const savedEmail = localStorage.getItem('savedEmail') ?? ''; // Asegurarse de que no sea null ni undefined
      const savedPassword = localStorage.getItem('savedPassword') ?? ''; // Asegurarse de que no sea null ni undefined
  
      // Rellenar el formulario si los valores existen
      if (savedEmail && savedPassword) {
        this.loginForm.patchValue({
          email: savedEmail,
          password: savedPassword,
        });
        this.rememberMe = true; // Si hay datos guardados, marcar "Recuérdame"
      }
    }
  }

  // Método para iniciar sesión
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
            localStorage.setItem('authToken', res.token); // Guardar en localStorage
            localStorage.setItem('savedEmail', this.loginForm.get('email')?.value ?? ''); // Guardar email en localStorage
            localStorage.setItem('savedPassword', this.loginForm.get('password')?.value ?? ''); // Guardar password en localStorage
          } else {
            // Si "Recordarme" no está marcado, guardar el token solo en sessionStorage
            sessionStorage.setItem('authToken', res.token); // Guardar en sessionStorage
            localStorage.removeItem('savedEmail'); // Limpiar email guardado si no está marcado
            localStorage.removeItem('savedPassword'); // Limpiar contraseña guardada si no está marcado
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

  // Método para redirigir a la página de registro
  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
