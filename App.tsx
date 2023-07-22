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
  WorkoutDetails: {workout: Workout};
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
              options={props => ({
                headerTitle: () => <WorkoutDetailsHeader {...props} />,
              })}
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

const WorkoutDetailsHeader = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {workout} = route.params! as {workout: Workout};

  const styles = StyleSheet.create({
    mainContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 0,
      padding: 0,
      gap: 8,
      width: '90%',
    },
    headerText: {
      color: 'black',
      fontSize: 20,
      textAlign: 'left',
    },
    buttonContainer: {
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>
        {workout.name.length > 20
          ? workout.name.slice(0, 20) + '...'
          : workout.name}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Edit"
          onPress={() => navigation.navigate('AddWorkout')}
        />
      </View>
    </View>
  );
};

export default WorkoutScreen;
