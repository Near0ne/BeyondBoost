import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExercisesService } from '../exercises.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-exercise-modal',
  templateUrl: './create-exercise-modal.page.html',
  styleUrls: ['./create-exercise-modal.page.scss'],
})
export class CreateExerciseModalPage implements OnInit {
  public createExerciseForm = this.fb.group({
    label: ['', Validators.required],
    description: [''],
  });

  constructor(
    public modalController: ModalController,
    private exercisesService: ExercisesService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {}

  public createExercise() {
    this.exercisesService.createExercise(
      this.createExerciseForm.controls.label.value,
      this.createExerciseForm.controls.description.value,
    );

    this.dismissModal();
  }

  public dismissModal(): void {
    this.modalController.dismiss();
  }
}
