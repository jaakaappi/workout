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
  weight: string;
  notes: string;
}

export interface Move {
  name: string;
  maximumWeight: string;
}

export interface WorkoutState {
  workouts: Workout[];
}
