import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './App';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {Workout} from './types';
import {Context} from './WorkoutStore';

export const WorkoutDetailsScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {workout} = route.params as {workout: Workout};
  const {dispatch} = useContext(Context);

  const handleDeleteWorkoutPressed = (workout: Workout) => {
    dispatch({type: 'deleteWorkout', payload: workout.id});
    navigation.navigate('Workouts');
  };

  const styles = StyleSheet.create({
    mainContainer: {
      padding: 8,
      gap: 6,
    },
    textFieldHeader: {
      color: 'black',
      fontWeight: 'bold',
    },
    textField: {
      flexShrink: 1,
      height: '100%',
      borderWidth: 1,
      maxHeight: 30,
      padding: 4,
      borderColor: 'grey',
    },
    moveRow: {
      flexDirection: 'row',
      padding: 8,
      gap: 8,
    },
    moveCountCell: {
      justifyContent: 'center',
    },
    deleteButton: {
      alignContent: 'center',
      alignSelf: 'flex-end',
      width: '100%',
    },
  });

  return (
    <View style={styles.mainContainer}>
      <Text>Notes</Text>
      <Text>{workout.notes.length > 0 ? workout.notes : 'No notes'}</Text>
      <Text>Breaks</Text>
      <Text>{workout.breaks}</Text>
      {workout.moves.length > 0 ? (
        <>
          <Text>Moves, series x reps, name</Text>
          <FlatList
            data={workout.moves}
            style={{display: 'flex'}}
            renderItem={({item: move}) => (
              <View style={styles.moveRow}>
                <View style={styles.moveCountCell}>
                  <Text>{`${move.series} x ${move.repetitions}`}</Text>
                </View>
                <View>
                  <Text>{move.move.name}</Text>
                  <Text>{move.notes}</Text>
                  <Text>{move.notes.length > 0 ? move.notes : 'No notes'}</Text>
                </View>
              </View>
            )}
          />
        </>
      ) : (
        <Text>No moves</Text>
      )}
      <View style={styles.deleteButton}>
        <Button
          title="Delete workout"
          color="red"
          onPress={() => handleDeleteWorkoutPressed(workout)}
        />
      </View>
    </View>
  );
};
