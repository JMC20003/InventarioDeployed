import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  error = '';
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  IniciarSesion(){
    if (this.loginForm.invalid) return;

    const credentials = {
      email: this.loginForm.value.email, // Asumes que el backend usa "username" en lugar de "email"
      password: this.loginForm.value.password
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.authService.guardarToken(res.token);
        this.router.navigate(['/inicio']); // Cambia según tu ruta de inicio
      },
      error: (err) => {
        this.error = 'Credenciales inválidas o error del servidor.';
        console.error(err);
      }
    });
  }
  onSubmit(): void {
   this.IniciarSesion();
  }
}
