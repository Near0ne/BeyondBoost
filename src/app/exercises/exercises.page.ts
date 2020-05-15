import { Component, OnInit } from '@angular/core';
import { CreateExerciseModalPage } from '../create-exercise-modal/create-exercise-modal.page';
import { ExercisesService } from '../exercises.service';
import { ExerciseDetailModalPage } from '../exercise-detail-modal/exercise-detail-modal.page';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IExercise } from '../shared/types/exercise.interface';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { QueryDocumentSnapshot } from '@angular/fire/firestore/interfaces';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {
  public exercises$: Observable<DocumentChangeAction<IExercise>[]>;

  constructor(public modalController: ModalController, private exercisesService: ExercisesService) {}

  ngOnInit() {
    this.exercises$ = this.exercisesService.fetchExercises();
  }

  public async presentCreateExerciseModal() {
    const modal = await this.modalController.create({
      component: CreateExerciseModalPage,
    });
    return await modal.present();
  }

  public async presentExerciseDetailModal(document: QueryDocumentSnapshot<IExercise>) {
    const exercise = {
      uid: document.id,
      ...document.data(),
    };

    const modal = await this.modalController.create({
      component: ExerciseDetailModalPage,
      componentProps: {
        exercise,
      },
    });

    return await modal.present();
  }
}
