import { IExercise } from './exercise.interface';

export interface IWorkout {
  uid: string;
  label: string;
  userId: string;
  dateCompleted: Date;
  exercises: IExercise[];
}
