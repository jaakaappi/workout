import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import {Workout} from './types';
import {getWorkouts} from './workouts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './App';
import {TextInput} from 'react-native-gesture-handler';
import {Context} from './WorkoutStore';

export const WorkoutsScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  // const workouts = useMemo(
  //   () => workoutState.workouts,
  //   [workoutState.workouts],
  // );

  // useEffect(() => {
  //   getWorkouts()
  //     .then(data => dispatchWorkouts({type: 'setWorkouts', payload: data}))
  //     .catch(exception => console.error(exception));
  // }, []);

  const {state} = useContext(Context);

  const workouts = useMemo(() => state.workouts, [state]);

  return (
    <View>
      {workouts.length == 0 ? (
        <View>
          <Text>No saved workouts</Text>
          <Button
            title="Add workout"
            onPress={() => navigation.navigate('AddWorkout')}></Button>
        </View>
      ) : (
        <FlatList
          data={workouts}
          renderItem={({item}) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </View>
  );
};
