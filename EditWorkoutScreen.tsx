import React, {useContext, useState} from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import uuid from 'react-native-uuid';

import {RootStackParamList} from './App';
import {Workout, WorkoutMove} from './types';
import {Context} from './WorkoutStore';
import {WorkoutMoveList} from './WorkoutMoveList';

export const EditWorkoutScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const params = route.params as {workout: Workout | undefined} | undefined;
  const [currentWorkout, setCurrentWorkout] = useState<Workout>(
    params?.workout ?? {
      id: '',
      name: '',
      notes: '',
      breaks: '',
      moves: [],
    },
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       return false;
  //     };

  //     const subscription = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       onBackPress,
  //     );

  //     return () => subscription.remove();
  //   }, []),
  // );

  const {dispatch} = useContext(Context);

  const handleAddMovePressed = () => {
    const newMoves = [
      ...currentWorkout.moves,
      {
        move: {name: '', maximumWeight: ''},
        repetitions: '',
        series: '',
        notes: '',
        weight: '',
      },
    ];
    setCurrentWorkout({...currentWorkout, moves: newMoves});
  };

  const handleMovesUpdated = (newMoves: WorkoutMove[]) => {
    setCurrentWorkout({...currentWorkout, moves: newMoves});
  };

  const handleWorkoutNameChanged = (name: string) => {
    setCurrentWorkout({...currentWorkout, name: name});
  };

  const handleWorkoutNotesChanged = (notes: string) => {
    setCurrentWorkout({...currentWorkout, notes: notes});
  };

  const handleSavePressed = () => {
    if (
      currentWorkout.name.length <= 0 ||
      currentWorkout.moves.some(
        move =>
          move.series === '' || move.repetitions === '' || move.weight === '',
      )
    ) {
      Alert.alert(
        'Missing info',
        'Workout name or some move name or number is missing!',
        [{text: 'Close'}],
      );
    } else {
      if (currentWorkout.id) {
        dispatch({
          type: 'addWorkout',
          payload: [currentWorkout],
        });
        navigation.navigate('WorkoutDetails', {workout: currentWorkout});
      } else {
        dispatch({
          type: 'addWorkout',
          payload: [{...currentWorkout, id: uuid.v4().toString()}],
        });
        navigation.navigate('Workouts');
      }
    }
  };

  const handleDeleteWorkoutPressed = (workout: Workout) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you wont to delete this workout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => {
            dispatch({type: 'deleteWorkout', payload: workout.id});
            navigation.navigate('Workouts');
          },
        },
      ],
    );
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
  });

  return (
    <ScrollView
      style={styles.mainContainer}
      automaticallyAdjustKeyboardInsets>
      <Text style={styles.textFieldHeader}>Name (required)</Text>
      <TextInput
        style={styles.textField}
        defaultValue={currentWorkout.name}
        placeholder="Name"
        onChangeText={text => handleWorkoutNameChanged(text)}
      />
      <Text style={styles.textFieldHeader}>Notes</Text>
      <TextInput
        style={styles.textField}
        defaultValue={currentWorkout.notes}
        multiline
        placeholder="Notes"
        onChangeText={text => handleWorkoutNotesChanged(text)}
      />
      <Text style={styles.textFieldHeader}>Moves</Text>
      <View>
        <Text>
          Series x reps, move name, weight{' '}
          <Text style={{fontWeight: 'bold'}}>(all required)</Text>
        </Text>
      </View>
      <WorkoutMoveList
        moves={currentWorkout.moves}
        updateWorkoutMoves={handleMovesUpdated}
      />
      <Button
        title="Add move"
        onPress={handleAddMovePressed}
      />
      <Button
        title="Save"
        color="green"
        onPress={handleSavePressed}
      />
      {currentWorkout.id && (
        <Button
          title="Delete workout"
          color="#DD0000"
          onPress={() => handleDeleteWorkoutPressed(currentWorkout)}
        />
      )}
    </ScrollView>
  );
};
