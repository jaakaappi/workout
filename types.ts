export interface Workout {
  id: string;
  name: string;
  notes: string;
  breaks: string;
  moves: WorkoutMove[];
}

export interface WorkoutMove {
  move: Move;
  repetitions: string;
  series: string;
  amount: string;
  notes: string;
}

export interface Move {
  name: string;
  maximumAmount: string;
  unit: MoveUnit;
}

export interface WorkoutState {
  workouts: Workout[];
}

export type MoveUnit = 's' | 'kg';
