import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddExerciseModalPage } from '../add-exercise-modal/add-exercise-modal.page';
import { WorkoutsService } from '../workouts.service';
import { AuthService } from '../auth.service';
import { concatMap } from 'rxjs/operators';
import { IUser } from '../shared/types/user.interface';
import { Observable, of } from 'rxjs';
import { IWorkout } from '../shared/types/workout.interface';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { IExercise } from '../shared/types/exercise.interface';
import { QueryDocumentSnapshot } from '@angular/fire/firestore/interfaces';
import { ExerciseDetailModalPage } from '../exercise-detail-modal/exercise-detail-modal.page';

@Component({
  selector: 'app-wod',
  templateUrl: './wod.page.html',
  styleUrls: ['./wod.page.scss'],
})
export class WodPage implements OnInit {
  public workout: IWorkout;
  public user: IUser;
  public workoutExercises$: Observable<DocumentChangeAction<IExercise>[]>;
  public workoutExercises;

  private workoutUid: string;

  constructor(
    public modalController: ModalController,
    private workoutsService: WorkoutsService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.user$
      .pipe(
        concatMap((user: IUser) => {
          this.user = user;

          if (user) {
            return this.workoutsService.fetchUserCurrentWorkout(user.uid);
          } else {
            return of(null);
          }
        }),
        concatMap((workout) => {
          if (workout && workout.length > 0) {
            this.workoutUid = workout[0].payload.doc.id;
            return of(workout[0].payload.doc.data());
          }

          if (this.user) {
            const workoutLabel = 'Nouvel Entraînement';
            return this.workoutsService.createWorkout(this.user.uid, workoutLabel);
          } else {
            return of(null);
          }
        }),
        concatMap((workout) => {
          this.workout = workout;

          if (workout) {
            return this.workoutsService.fetchWorkoutExercises(this.workoutUid);
          }

          return of(null);
        }),
      )
      .subscribe((exercises) => {
        if (exercises) {
          this.workoutExercises = exercises;
        }
      });
  }

  public removeExercise(event, exerciseUid: string): void {
    event.stopPropagation();

    this.workoutsService
      .deleteWorkoutExercise(this.workoutUid, exerciseUid)
      .then((res) => {})
      .catch((err) => console.log('Error', err));
  }

  public completeWorkout(): void {
    this.workoutsService
      .updateWorkout(this.workoutUid, { dateCompleted: new Date() })
      .then((res) => {
        return this.workoutsService
          .fetchUserCurrentWorkout(this.user.uid)
          .pipe(
            concatMap((workout) => {
              if (workout && workout.length > 0) {
                this.workoutUid = workout[0].payload.doc.id;
                return of(workout[0].payload.doc.data());
              }
            }),
            concatMap((workout) => {
              this.workout = workout;

              if (workout) {
                return this.workoutsService.fetchWorkoutExercises(this.workoutUid);
              }

              return of(null);
            }),
          )
          .subscribe((exercises) => {
            if (exercises) {
              this.workoutExercises = exercises;
            }
          });
      })
      .catch((err) => console.log(err));
  }

  public async presentAddExerciseModal() {
    const modal = await this.modalController.create({
      component: AddExerciseModalPage,
      componentProps: {
        workoutUid: this.workoutUid,
      },
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
        editable: false,
      },
    });

    return await modal.present();
  }
}
