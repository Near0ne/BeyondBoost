import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { IExercise } from './shared/types/exercise.interface';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private collectionName = 'exercises';

  constructor(private firestore: AngularFirestore) {}

  public fetchExercises(): Observable<DocumentChangeAction<IExercise>[]> {
    return this.firestore.collection<IExercise>(this.collectionName).snapshotChanges();
  }

  public createExercise(label: string, description: string = null): Promise<DocumentReference> {
    const exercise = {
      label,
      description,
    };

    return this.firestore.collection(this.collectionName).add(exercise);
  }

  public updateExercise(uid: string, data: { label?: string; description?: string }) {
    return this.firestore
      .collection(this.collectionName)
      .doc(uid)
      .set({ ...data }, { merge: true });
  }

  public deleteExercise(uid: string): void {
    this.firestore.collection(this.collectionName).doc(uid).delete();
  }
}
