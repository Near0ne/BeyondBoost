import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { WorkoutsService } from '../workouts.service';
import { ExercisesService } from '../exercises.service';
import { Observable } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { IExercise } from '../shared/types/exercise.interface';

@Component({
  selector: 'app-add-exercise-modal',
  templateUrl: './add-exercise-modal.page.html',
  styleUrls: ['./add-exercise-modal.page.scss'],
})
export class AddExerciseModalPage implements OnInit {
  @Input() workoutUid: string;

  public exercises$: Observable<DocumentChangeAction<IExercise>[]>;
  public addExerciseForm = this.fb.group({
    exercise: ['', Validators.required],
  });

  constructor(
    public modalController: ModalController,
    private workoutsService: WorkoutsService,
    private exercisesService: ExercisesService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.exercises$ = this.exercisesService.fetchExercises();
  }

  public addExercise(): void {
    const workoutUid = this.workoutUid;
    this.exercises$.subscribe((exercises) => {
      const exercise = exercises.find((ex) => ex.payload.doc.id === this.addExerciseForm.controls.exercise.value);
      this.workoutsService
        .addExercise(workoutUid, exercise.payload.doc.data())
        .then((res) => {
          this.dismissModal();
        })
        .catch((err) => console.log(err));
    });
  }

  public dismissModal(): void {
    this.modalController.dismiss();
  }
}
