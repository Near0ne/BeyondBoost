import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    public toastController: ToastController,
  ) {}

  ngOnInit() {}

  public register(): void {
    const email = this.registerForm.controls.email.value;
    const password = this.registerForm.controls.password.value;

    this.authService
      .registerUser(email, password)
      .then((userCredentials) => {
        this.authService
          .signIn(email, password)
          .then((res) => {
            this.router.navigate(['/app', 'wod']);
          })
          .catch((err) => {
            this.router.navigate(['/auth', 'login']);
          });
      })
      .catch((err) => {
        console.log('ERR', err.code);
        let message: string;

        switch (err.code) {
          case 'auth/invalid-email':
            message = "L'adresse email est invalide.";
            break;

          case 'auth/weak-password':
            message = 'Le mot de passe doit contenir au moins 6 caractères.';
            break;

          default:
            message = 'Une erreur est survenue, veuillez réessayer.';
        }

        this.showErrorToast(message);
      });
  }

  private async showErrorToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
    });

    toast.present();
  }
}
