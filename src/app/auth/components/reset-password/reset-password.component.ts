import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
  
})
export class ResetPasswordComponent implements OnInit {
  token: string | null = null;  // Guarda token recibido
  newPassword: string = '';     // Guarda nueva contraseña
  confirmPassword: string = ''; // Guarda confirmación de la contraseña

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el token desde la URL
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.token && this.newPassword === this.confirmPassword) {
      // Llamar al servicio para restablecer la contraseña
      this.authService.resetPassword(this.token, this.newPassword).subscribe(
        response => {
          // Muestra una alerta de éxito
          Swal.fire('Éxito', 'Contraseña restablecida correctamente', 'success');

          // Redirige al usuario a la página de login
          this.router.navigate(['/auth/login']);  // Asegúrate de que la ruta sea '/auth/login'
        },
        error => {
          // Muestra una alerta de error si no se pudo restablecer la contraseña
          Swal.fire('Error', 'No se pudo restablecer la contraseña', 'error');
        }
      );
    } else {
      // Si las contraseñas no coinciden o el token no es válido
      Swal.fire('Error', 'Las contraseñas no coinciden o el token es inválido', 'error');
    }
  }
}