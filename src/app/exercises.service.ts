import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ExerciseInterface {
  id: number;
  label: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private exercises = new BehaviorSubject<ExerciseInterface[]>([
    { id: 1, label: 'Pull-up', description: 'Pull yourself up.' },
    { id: 2, label: 'Push-up', description: 'Push yourself up.' },
    { id: 3, label: 'Squat', description: 'Squat your body.' },
  ]);
  public exercises$ = this.exercises.asObservable();

  constructor() {}

  public fetchExercises(): Observable<ExerciseInterface[]> {
    return this.exercises$;
  }

  public createExercise(label: string, description: string = null): void {
    const exercises = this.exercises.getValue();
    const exercise: ExerciseInterface = {
      id: exercises.length + 1,
      label,
      description,
    };
    const updatedExercises = [...exercises, exercise];

    this.exercises.next(updatedExercises);
  }

  public deleteExercise(id: number): void {
    const exercises = this.exercises.getValue();
    const removeId = exercises.findIndex((ex) => ex.id === id);
    exercises.splice(removeId, 1);

    this.exercises.next(exercises);
  }
}
