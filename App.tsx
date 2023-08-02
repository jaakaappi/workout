import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
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
import {IconButton} from './IconButton';

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
      <IconButton
        icon="plus"
        color="green"
        text="New"
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
    textContainer: {
      maxWidth: '70%',
      flexWrap: 'nowrap',
      flexDirection: 'row',
      flexGrow: 0,
      flexShrink: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      gap: 6,
      justifyContent: 'center',
    },
    buttonStyle: {
      padding: 0,
      paddingHorizontal: 6,
    },
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text
          style={styles.headerText}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {workout.name}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <IconButton
          icon="square-edit-outline"
          variant="plain"
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('EditWorkout', {workout: workout})}
        />
        <IconButton
          text="Start"
          color="green"
          icon="play-outline"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default WorkoutScreen;
