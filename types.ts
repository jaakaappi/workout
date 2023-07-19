export interface Workout {
  name: string;
  notes: string;
  moves: WorkoutMove[];
}

export interface WorkoutMove {
  move: Move;
  repetitions: number;
  series: number;
}

export interface Move {
  name: string;
  notes: string;
}

export interface WorkoutState {
  workouts: Workout[];
}
