import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExercisesService } from '../exercises.service';
import { IExercise } from '../shared/types/exercise.interface';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-exercise-detail-modal',
  templateUrl: './exercise-detail-modal.page.html',
  styleUrls: ['./exercise-detail-modal.page.scss'],
})
export class ExerciseDetailModalPage implements OnInit {
  @Input() exercise: IExercise;

  public showEditForm = false;
  public editExerciseForm = this.fb.group({
    label: ['', Validators.required],
    description: [''],
  });

  constructor(
    private fb: FormBuilder,
    public modalController: ModalController,
    private exercisesService: ExercisesService,
  ) {}

  ngOnInit() {
    this.editExerciseForm.patchValue({
      label: this.exercise.label,
      description: this.exercise.description,
    });
  }

  public updateExercise() {
    const data = {
      label: this.editExerciseForm.controls.label.value,
      description: this.editExerciseForm.controls.description.value,
    };

    this.exercisesService
      .updateExercise(this.exercise.uid, data)
      .then((res) => {
        this.showEditForm = false;
        this.exercise.label = data.label;
        this.exercise.description = data.description;
      })
      .catch((err) => console.log('Erreur', err));
  }

  public dismissModal(): void {
    this.modalController.dismiss();
  }

  public deleteExercise(): void {
    this.exercisesService
      .deleteExercise(this.exercise.uid)
      .then((res) => this.dismissModal())
      .catch((err) => console.log(err));
  }
}
