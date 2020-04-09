import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExerciseDetailModalPageRoutingModule } from './exercise-detail-modal-routing.module';

import { ExerciseDetailModalPage } from './exercise-detail-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExerciseDetailModalPageRoutingModule
  ],
  declarations: [ExerciseDetailModalPage]
})
export class ExerciseDetailModalPageModule {}
