export interface Workout {
  name: string;
  description: string;
}

export interface WorkoutMove {
  move: Move;
  repetitions: number;
  series: number;
}

export interface Move {
  name: string;
  description: string;
}
