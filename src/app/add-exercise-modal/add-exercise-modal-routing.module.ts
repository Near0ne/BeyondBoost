import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExerciseModalPage } from './add-exercise-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddExerciseModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddExerciseModalPageRoutingModule {}
