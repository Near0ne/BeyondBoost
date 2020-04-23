import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private fingerprintOptions: FingerprintOptions;

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private androidFingerprintAuth: AndroidFingerprintAuth,
    private faio: FingerprintAIO,
    public toastController: ToastController,
  ) {}

  public showFingerprintAuthDialog() {
    this.androidFingerprintAuth
      .isAvailable()
      .then((result) => {
        if (result.isAvailable) {
          // it is available

          this.androidFingerprintAuth
            .encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
            .then((result) => {
              if (result.withFingerprint) {
                console.log('Successfully encrypted credentials.');
                console.log('Encrypted credentials: ' + result.token);
              } else if (result.withBackup) {
                console.log('Successfully authenticated with backup password!');
              } else {
                console.log("Didn't authenticate!");
              }
            })
            .catch((error) => {
              if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                console.log('Fingerprint authentication cancelled');
              } else {
                console.error(error);
              }
            });
        } else {
          // fingerprint auth isn't available
        }
      })
      .catch((error) => console.error(error));

    // this.faio
    //   .show({
    //     title: 'Biometric Authentication', // (Android Only) | optional | Default: "<APP_NAME> Biometric Sign On"
    //     description: 'Please authenticate', // optional | Default: null
    //     fallbackButtonTitle: 'Use Backup', // optional | When disableBackup is false defaults to "Use Pin".
    //     // When disableBackup is true defaults to "Cancel"
    //     disableBackup: true, // optional | default: false
    //   })
    //   .then((result: any) => console.log(result))
    //   .catch((error: any) => console.log(error));

    // this.faio.isAvailable().then((result) => {
    //   if (result === 'OK') {
    //     this.faio
    //       .show({
    //         clientId: 'boostBeyond', // Android: Used for encryption. iOS: used for dialogue if no `localizedReason` is given.
    //         clientSecret: 'o7aoOMYUbyxaD23oFAnJ', // Necessary for Android encrpytion of keys. Use random secret key.
    //         disableBackup: true, // Only for Android(optional)
    //         localizedFallbackTitle: 'Use Pin', // Only for iOS
    //         localizedReason: 'Please authenticate', // Only for iOS
    //       })
    //       .then((result: any) => console.log(result))
    //       .catch((error: any) => console.log(error));
    //   }
    // });
  }

  ngOnInit() {
    // this.androidFingerprintAuth
    //   .isAvailable()
    //   .then((result) => {
    //     if (result.isAvailable) {
    //       // it is available
    //
    //       this.androidFingerprintAuth
    //         .encrypt({ clientId: 'boostBeyond', username: 'myUsername', password: 'myPassword' })
    //         .then((result) => {
    //           if (result.withFingerprint) {
    //             alert('Successfully encrypted credentials.');
    //             alert('Encrypted credentials: ' + result.token);
    //           } else if (result.withBackup) {
    //             alert('Successfully authenticated with backup password!');
    //           } else {
    //             alert("Didn't authenticate!");
    //           }
    //         })
    //         .catch((error) => {
    //           if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
    //             alert('Fingerprint authentication cancelled');
    //           } else {
    //             alert(error);
    //           }
    //         });
    //     } else {
    //       // fingerprint auth isn't available
    //     }
    //   })
    //   .catch((error) => console.error(error));
  }

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
