import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WodPageRoutingModule } from './wod-routing.module';

import { WodPage } from './wod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WodPageRoutingModule
  ],
  declarations: [WodPage]
})
export class WodPageModule {}
