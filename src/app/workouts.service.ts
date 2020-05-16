import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentData,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { IExercise } from './shared/types/exercise.interface';
import { IWorkout } from './shared/types/workout.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  private collectionName = 'workouts';

  constructor(private firestore: AngularFirestore) {}

  public fetchUserWorkouts(userId: string): Observable<DocumentChangeAction<IWorkout>[]> {
    return this.firestore
      .collection<IWorkout>(this.collectionName, (ref) => ref.where('userId', '==', userId))
      .snapshotChanges();
  }

  public fetchUserCurrentWorkout(userId: string): Observable<DocumentChangeAction<IWorkout>[]> {
    return this.firestore
      .collection<IWorkout>(this.collectionName, (ref) =>
        ref.where('userId', '==', userId).where('dateCompleted', '==', null),
      )
      .snapshotChanges();
  }

  public fetchWorkoutExercises(workoutId: string): Observable<DocumentChangeAction<IExercise>[]> {
    return this.firestore
      .collection<IWorkout>(this.collectionName)
      .doc(workoutId)
      .collection<IExercise>('exercises')
      .snapshotChanges();
  }

  public createWorkout(userId: string, label: string): Promise<DocumentReference> {
    const workout = {
      userId,
      label,
      dateCompleted: null,
    };

    return this.firestore.collection(this.collectionName).add(workout);
  }

  public addExercise(workoutUid: string, exercise: IExercise): Promise<DocumentReference> {
    return this.firestore.collection(this.collectionName).doc(workoutUid).collection('exercises').add(exercise);
  }

  public updateWorkout(uid: string, data: { label?: string }): Promise<void> {
    return this.firestore
      .collection(this.collectionName)
      .doc(uid)
      .set({ ...data }, { merge: true });
  }

  public deleteWorkoutExercise(workoutUid: string, exerciseUid: string): Promise<void> {
    return this.firestore
      .collection(this.collectionName)
      .doc(workoutUid)
      .collection('exercises')
      .doc(exerciseUid)
      .delete();
  }

  public deleteWorkout(uid: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(uid).delete();
  }
}
