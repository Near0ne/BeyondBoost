import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateExerciseModalPage } from './create-exercise-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreateExerciseModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateExerciseModalPageRoutingModule {}
