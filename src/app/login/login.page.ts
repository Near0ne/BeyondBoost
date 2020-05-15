import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm = this.fb.group({
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

  public login(): void {
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    this.authService
      .signIn(email, password)
      .then((res) => {
        this.router.navigate(['/app', 'wod']);
      })
      .catch((err) => {
        console.error('ERR', err.code);
        let message: string;

        switch (err.code) {
          case 'auth/wrong-password':
            message = 'Les identifiants sont incorrects';
            break;

          case 'auth/user-not-found':
            message = 'Les identifiants sont incorrects';
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
