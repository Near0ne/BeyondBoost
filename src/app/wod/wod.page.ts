import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateExerciseModalPage } from '../create-exercise-modal/create-exercise-modal.page';
import { Observable } from 'rxjs';
import { ExerciseInterface, ExercisesService } from '../exercises.service';
import { ExerciseDetailModalPage } from '../exercise-detail-modal/exercise-detail-modal.page';

@Component({
  selector: 'app-wod',
  templateUrl: './wod.page.html',
  styleUrls: ['./wod.page.scss'],
})
export class WodPage implements OnInit {
  public exercises$: Observable<ExerciseInterface[]>;

  constructor(public modalController: ModalController, private exercisesService: ExercisesService) {}

  public async presentCreateExerciseModal() {
    const modal = await this.modalController.create({
      component: CreateExerciseModalPage,
    });
    return await modal.present();
  }

  public async presentExerciseDetailModal(exercise: ExerciseInterface) {
    const modal = await this.modalController.create({
      component: ExerciseDetailModalPage,
      componentProps: {
        exercise,
      },
    });
    return await modal.present();
  }

  ngOnInit(): void {
    this.exercises$ = this.exercisesService.exercises$;
  }
}
