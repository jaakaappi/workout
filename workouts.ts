import AsyncStorage from '@react-native-async-storage/async-storage';
import {Workout} from './types';

export const getWorkouts = async (): Promise<Workout[]> => {
  const value = await AsyncStorage.getItem('workouts');
  if (value !== null) {
    return JSON.parse(value) as Workout[];
  } else return [];
};
