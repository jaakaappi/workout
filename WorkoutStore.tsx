import React from 'react';
import {Children, createContext, useReducer} from 'react';
import {Workout, WorkoutState} from './types';

type WorkoutContext = {
  state: WorkoutState;
  dispatch: React.Dispatch<{
    type: string;
    payload: Workout[];
  }>;
};

const initialState: WorkoutContext = {
  state: {workouts: []},
  dispatch: ({type, payload}) => {},
};

export const Context = createContext(initialState);

export const WorkoutStore = ({children}: React.PropsWithChildren) => {
  const workoutReducer = (
    state: WorkoutState,
    action: {type: string; payload: Workout[]},
  ) => {
    switch (action.type) {
      case 'setWorkouts':
        return {...state, workouts: action.payload};
      case 'addWorkout':
        return {...state, workouts: [...state.workouts, ...action.payload]};
      default:
        throw Error('Unknown action.');
    }
  };

  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: [],
  });

  return (
    <Context.Provider value={{state: state, dispatch: dispatch}}>
      {children}
    </Context.Provider>
  );
};
