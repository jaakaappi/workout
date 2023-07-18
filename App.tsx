import React, {
  createContext,
  useContext,
  useEffect,
  useInsertionEffect,
  useReducer,
  useState,
} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {getWorkouts} from './workouts';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WorkoutsScreen} from './WorkoutsScreen';
import {AddWorkoutScreen} from './AddWorkoutScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Workout, WorkoutState} from './types';
import {WorkoutStore} from './WorkoutStore';

export type RootStackParamList = {
  Workouts: undefined;
  AddWorkout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const WorkoutScreen = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  // const addNewWorkout = (workout: Workout) => {
  //   const newWorkouts = [...workouts, workout];
  //   setWorkouts(newWorkouts);
  // };

  return (
    <NavigationContainer>
      <WorkoutStore>
        <GestureHandlerRootView style={{flex: 1}}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Stack.Navigator>
            <Stack.Screen
              name="Workouts"
              component={WorkoutsScreen}
              options={{title: 'Workouts'}}
            />
            <Stack.Screen
              name="AddWorkout"
              component={AddWorkoutScreen}
              options={{title: 'Add workout'}}
            />
          </Stack.Navigator>
        </GestureHandlerRootView>
      </WorkoutStore>
    </NavigationContainer>
  );
};

export default WorkoutScreen;
