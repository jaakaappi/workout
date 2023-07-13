import React, {
  createContext,
  useContext,
  useEffect,
  useInsertionEffect,
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
import {AppContext, Workout} from './types';

export type RootStackParamList = {
  Workouts: undefined;
  AddWorkout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    getWorkouts()
      .then(data => setWorkouts(data))
      .catch(exception => console.error(exception));
  }, []);
  const AppContext = createContext<AppContext>({workouts: workouts});

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContext.Provider value={{workouts: workouts}}>
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
        </AppContext.Provider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default App;
