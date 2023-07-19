import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
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

  const {state, dispatch} = useContext(Context);

  const workouts = useMemo(() => state.workouts, [state]);

  const handleDeleteWorkoutPressed = (workoutIndex: number) => {
    dispatch({type: 'deleteWorkout', payload: workoutIndex});
  };

  const styles = StyleSheet.create({
    workoutRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 6,
    },
  });

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
          renderItem={({item, index}) => (
            <View style={styles.workoutRow}>
              <View>
                <Text>{`${item.name}: ${item.moves.length}`}</Text>
                <Text>{item.notes}</Text>
              </View>
              <Button
                title="Delete"
                onPress={() => handleDeleteWorkoutPressed(index)}
              />
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </View>
  );
};
