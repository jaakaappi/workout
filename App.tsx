import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {WorkoutsScreen} from './WorkoutsScreen';
import {EditWorkoutScreen} from './EditWorkoutScreen';
import {Workout} from './types';
import {WorkoutStore} from './WorkoutStore';
import {WorkoutDetailsScreen} from './WorkoutDetailScreen';
import {SettingsScreen} from './SettingsScreen';

export type RootStackParamList = {
  Workouts: undefined;
  EditWorkout: {workout?: Workout};
  WorkoutDetails: {workout: Workout};
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const WorkoutScreen = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <WorkoutStore>
        <GestureHandlerRootView style={{flex: 1}}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <WorkoutStack />
        </GestureHandlerRootView>
      </WorkoutStore>
    </NavigationContainer>
  );
};

const WorkoutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Workouts"
        component={WorkoutsScreen}
        options={props => ({
          headerTitle: () => <WorkoutScreenHeader {...props} />,
        })}
      />
      <Stack.Screen
        name="EditWorkout"
        component={EditWorkoutScreen}
        options={{title: 'Edit workout'}}
      />
      <Stack.Screen
        name="WorkoutDetails"
        component={WorkoutDetailsScreen}
        options={props => ({
          headerTitle: () => <WorkoutDetailsHeader {...props} />,
        })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Stack.Navigator>
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
        color="green"
        onPress={() => navigation.navigate('EditWorkout', {workout: undefined})}
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
      flexDirection: 'row',
      gap: 6,
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
          title="Start workout"
          color="green"
          disabled
        />
        <Button
          title="Edit"
          onPress={() => navigation.navigate('EditWorkout', {workout: workout})}
        />
      </View>
    </View>
  );
};

export default WorkoutScreen;
