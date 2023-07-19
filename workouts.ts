import AsyncStorage from '@react-native-async-storage/async-storage';
import {Workout} from './types';

export const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const value = await AsyncStorage.getItem('workouts');
    console.log(JSON.stringify(value));
    if (value !== null) {
      return JSON.parse(value) as Workout[];
    } else return [];
  } catch (error) {
    console.error('Failed to read workouts', error);
    return [];
  }
};

export const saveWorkouts = async (workouts: Workout[]): Promise<void> => {
  try {
    await AsyncStorage.setItem('workouts', JSON.stringify(workouts));
  } catch (error) {
    console.error('Failed to save workouts', error);
  }
};
