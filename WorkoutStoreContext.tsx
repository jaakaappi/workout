import React, {useEffect} from 'react';
import {createContext, useReducer} from 'react';
import {Workout, WorkoutState} from './types';
import {getWorkouts, saveWorkouts} from './utils/workouts';

type WorkoutContext = {
  state: WorkoutState;
  dispatch: React.Dispatch<{
    type: string;
    payload: Workout[] | number | string;
  }>;
};

const initialState: WorkoutContext = {
  state: {workouts: []},
  dispatch: ({type, payload}) => {},
};

export const Context = createContext(initialState);

export const WorkoutStoreContext = ({children}: React.PropsWithChildren) => {
  const workoutReducer = (
    state: WorkoutState,
    action: {type: string; payload: Workout[] | number | string},
  ): WorkoutState => {
    switch (action.type) {
      case 'setWorkouts': {
        return {...state, workouts: action.payload as Workout[]};
      }
      case 'addWorkout': {
        const existingWorkoutIndex = state.workouts.findIndex(
          workout => workout.id === action.payload[0].id,
        );
        if (existingWorkoutIndex > -1) {
          const updatedWorkouts = [
            ...state.workouts.slice(0, existingWorkoutIndex),
            {...action.payload[0]},
            ...state.workouts.slice(existingWorkoutIndex + 1),
          ];
          saveWorkouts(updatedWorkouts);
          return {...state, workouts: updatedWorkouts};
        } else {
          const newWorkouts = [
            ...state.workouts,
            ...(action.payload as Workout[]),
          ];
          saveWorkouts(newWorkouts);
          return {...state, workouts: newWorkouts};
        }
      }
      case 'deleteWorkout': {
        const workoutIndex = state.workouts.findIndex(
          workout => workout.id === (action.payload as string),
        );
        const newWorkouts = [
          ...state.workouts.slice(0, workoutIndex),
          ...state.workouts.slice(workoutIndex + 1),
        ];
        saveWorkouts(newWorkouts);
        return {...state, workouts: newWorkouts};
      }
      case 'deleteAllWorkouts': {
        saveWorkouts([]);
        return {...state, workouts: []};
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
