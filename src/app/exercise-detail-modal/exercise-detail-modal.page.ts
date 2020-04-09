import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExerciseInterface, ExercisesService } from '../exercises.service';

@Component({
  selector: 'app-exercise-detail-modal',
  templateUrl: './exercise-detail-modal.page.html',
  styleUrls: ['./exercise-detail-modal.page.scss'],
})
export class ExerciseDetailModalPage implements OnInit {
  @Input() exercise: ExerciseInterface;

  constructor(public modalController: ModalController, private exercisesService: ExercisesService) {}

  ngOnInit() {}

  public dismissModal(): void {
    this.modalController.dismiss();
  }

  public deleteExercise(): void {
    this.exercisesService.deleteExercise(this.exercise.id);
    this.dismissModal();
  }
}
