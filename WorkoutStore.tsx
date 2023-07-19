import React, {useEffect} from 'react';
import {Children, createContext, useReducer} from 'react';
import {Workout, WorkoutState} from './types';
import {getWorkouts, saveWorkouts} from './workouts';

type WorkoutContext = {
  state: WorkoutState;
  dispatch: React.Dispatch<{
    type: string;
    payload: Workout[] | number;
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
    action: {type: string; payload: Workout[] | number},
  ): WorkoutState => {
    switch (action.type) {
      case 'setWorkouts': {
        return {...state, workouts: action.payload as Workout[]};
      }
      case 'addWorkout': {
        const newWorkouts = [
          ...state.workouts,
          ...(action.payload as Workout[]),
        ];
        saveWorkouts(newWorkouts);
        return {...state, workouts: newWorkouts};
      }
      case 'deleteWorkout': {
        const newWorkouts = [
          ...state.workouts.slice(0, action.payload as number),
          ...state.workouts.slice((action.payload as number) + 1),
        ];
        saveWorkouts(newWorkouts);
        return {...state, workouts: newWorkouts};
      }
      default:
        throw Error('Unknown action.');
    }
  };

  const [state, dispatch] = useReducer(workoutReducer, {workouts: []});

  useEffect(() => {
    getWorkouts()
      .then(data => dispatch({type: 'setWorkouts', payload: data}))
      .catch(exception => console.error(exception));
  }, []);

  return (
    <Context.Provider value={{state: state, dispatch: dispatch}}>
      {children}
    </Context.Provider>
  );
};
