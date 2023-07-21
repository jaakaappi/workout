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
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {WorkoutsScreen} from './WorkoutsScreen';
import {AddWorkoutScreen} from './AddWorkoutScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Workout, WorkoutState} from './types';
import {WorkoutStore} from './WorkoutStore';
import {WorkoutDetailsScreen} from './WorkoutDetailScreen';

export type RootStackParamList = {
  Workouts: undefined;
  AddWorkout: undefined;
  WorkoutDetails: undefined;
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
              options={props => ({
                headerTitle: () => <WorkoutScreenHeader {...props} />,
              })}
            />
            <Stack.Screen
              name="AddWorkout"
              component={AddWorkoutScreen}
              options={{title: 'Add workout'}}
            />
            <Stack.Screen
              name="WorkoutDetails"
              component={WorkoutDetailsScreen}
            />
          </Stack.Navigator>
        </GestureHandlerRootView>
      </WorkoutStore>
    </NavigationContainer>
  );
};

const WorkoutScreenHeader = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const styles = StyleSheet.create({
    mainContainer: {
      margin: 0,
      padding: 0,
      paddingRight: 32,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerText: {
      color: 'black',
      fontSize: 20,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>Workouts</Text>
      <Button
        title="Add new"
        onPress={() => navigation.navigate('AddWorkout')}
      />
    </View>
  );
};

export default WorkoutScreen;
