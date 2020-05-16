import { NgModule } from '@angular/core';
import { AddExerciseModalPageRoutingModule } from './add-exercise-modal-routing.module';
import { AddExerciseModalPage } from './add-exercise-modal.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, AddExerciseModalPageRoutingModule],
  declarations: [AddExerciseModalPage],
})
export class AddExerciseModalPageModule {}
