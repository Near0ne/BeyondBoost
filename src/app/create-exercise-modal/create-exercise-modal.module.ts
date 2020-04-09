import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateExerciseModalPageRoutingModule } from './create-exercise-modal-routing.module';

import { CreateExerciseModalPage } from './create-exercise-modal.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CreateExerciseModalPageRoutingModule, ReactiveFormsModule],
  declarations: [CreateExerciseModalPage],
})
export class CreateExerciseModalPageModule {}
