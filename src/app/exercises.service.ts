import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
    { id: 1, label: 'pull-up', description: 'pull yourself up' },
    { id: 1, label: 'push-up', description: 'push yourself up' },
    { id: 1, label: 'squat', description: 'squat your body' },
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
}
