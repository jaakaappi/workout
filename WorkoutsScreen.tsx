import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Workout} from './types';
import {getWorkouts} from './workouts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './App';
import {TextInput, TouchableHighlight} from 'react-native-gesture-handler';
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
      backgroundColor: '#ffffff',
    },
    workoutRowHeaderContainer: {
      flexGrow: 0,
      flexShrink: 1,
    },
    workoutRowHeader: {
      fontWeight: 'bold',
      color: 'black',
    },
    workoutRowButtonContainer: {
      flexDirection: 'row',
      gap: 6,
      alignSelf: 'center',
    },
  });

  return (
    <View>
      {workouts.length == 0 ? (
        <View>
          <Text>No saved workouts</Text>
        </View>
      ) : (
        <FlatList
          data={workouts}
          style={{width: '100%'}}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() =>
                navigation.navigate('WorkoutDetails', {
                  workout: item,
                })
              }>
              <View style={styles.workoutRow}>
                <View style={styles.workoutRowHeaderContainer}>
                  <Text style={styles.workoutRowHeader}>{item.name}</Text>
                  <Text>{`${item.moves.length} moves - ${
                    item.breaks ? `${item.breaks}s breaks` : 'No breaks'
                  }`}</Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="head">
                    {item.notes || 'No notes'}
                  </Text>
                </View>
                <View style={styles.workoutRowButtonContainer}>
                  <Button title="Edit" />
                  <Button
                    title="Delete"
                    onPress={() => handleDeleteWorkoutPressed(index)}
                  />
                </View>
              </View>
            </Pressable>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </View>
  );
};
