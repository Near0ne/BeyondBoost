import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthPageRoutingModule } from './auth-routing.module';
import { AuthPage } from './auth.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, IonicModule, AuthPageRoutingModule],
  declarations: [AuthPage],
})
export class AuthPageModule {}
