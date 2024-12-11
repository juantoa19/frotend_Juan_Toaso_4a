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
  token: string | null = null;  // Guardar el token recibido
  newPassword: string = '';     // Guardar la nueva contraseña
  confirmPassword: string = ''; // Guardar la confirmación de la contraseña

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
          Swal.fire('Éxito', 'Contraseña restablecida correctamente', 'success');
          this.router.navigate(['/login']);  // Redirigir al usuario a la página de login
        },
        error => {
          Swal.fire('Error', 'No se pudo restablecer la contraseña', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Las contraseñas no coinciden o el token es inválido', 'error');
    }
  }
}