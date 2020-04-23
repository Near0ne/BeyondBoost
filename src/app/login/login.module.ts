import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { SharedModule } from '../shared/shared.module';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

@NgModule({
  imports: [SharedModule, IonicModule, LoginPageRoutingModule],
  declarations: [LoginPage],
  providers: [AndroidFingerprintAuth],
})
export class LoginPageModule {}
