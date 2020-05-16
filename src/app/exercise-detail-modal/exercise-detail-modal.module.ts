import { NgModule } from '@angular/core';

import { ExerciseDetailModalPageRoutingModule } from './exercise-detail-modal-routing.module';

import { ExerciseDetailModalPage } from './exercise-detail-modal.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, ExerciseDetailModalPageRoutingModule],
  declarations: [ExerciseDetailModalPage],
})
export class ExerciseDetailModalPageModule {}
