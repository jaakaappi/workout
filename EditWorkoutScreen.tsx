import React, {useContext, useMemo, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import uuid from 'react-native-uuid';

import {RootStackParamList} from './App';
import {Workout} from './types';
import {Context} from './WorkoutStore';
import {IconButton} from './IconButton';
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

  const handleMoveSeriesChanged = (newValue: string, moveIndex: number) => {
    const cleanedValue = newValue
      .replace(/[^0-9]/g, '')
      .split(',')[0]
      .split('.')[0];

    const oldMove = currentWorkout.moves[moveIndex];
    const newMoves = [
      ...currentWorkout.moves.slice(0, moveIndex),
      {
        ...oldMove,
        series:
          cleanedValue != ''
            ? Math.floor(parseFloat(cleanedValue)).toString()
            : '',
      },
      ...currentWorkout.moves.slice(moveIndex + 1),
    ];
    setCurrentWorkout({...currentWorkout, moves: newMoves});
  };

  const handleMoveRepetitionsChanged = (
    newValue: string,
    moveIndex: number,
  ) => {
    const cleanedValue = newValue
      .replace(/[^0-9]/g, '')
      .split(',')[0]
      .split('.')[0];

    const oldMove = currentWorkout.moves[moveIndex];
    const newMoves = [
      ...currentWorkout.moves.slice(0, moveIndex),
      {
        ...oldMove,
        repetitions:
          cleanedValue != ''
            ? Math.floor(parseFloat(cleanedValue)).toString()
            : '',
      },
      ...currentWorkout.moves.slice(moveIndex + 1),
    ];
    setCurrentWorkout({...currentWorkout, moves: newMoves});
  };

  const handleMoveNameChanged = (newValue: string, moveIndex: number) => {
    const oldMove = currentWorkout.moves[moveIndex];
    const newMoves = [
      ...currentWorkout.moves.slice(0, moveIndex),
      {...oldMove, move: {...oldMove.move, name: newValue}},
      ...currentWorkout.moves.slice(moveIndex + 1),
    ];
    setCurrentWorkout({...currentWorkout, moves: newMoves});
  };

  const handleMoveWeightChanged = (newValue: string, moveIndex: number) => {
    const cleanedValue = newValue
      .replace(/[^0-9]/g, '')
      .split(',')[0]
      .split('.')[0];

    const oldMove = currentWorkout.moves[moveIndex];
    const newMoves = [
      ...currentWorkout.moves.slice(0, moveIndex),
      {
        ...oldMove,
        weight:
          cleanedValue != ''
            ? Math.floor(parseFloat(cleanedValue)).toString()
            : '',
      },
      ...currentWorkout.moves.slice(moveIndex + 1),
    ];

    setCurrentWorkout({...currentWorkout, moves: newMoves});
  };

  const handleWorkoutNameChanged = (name: string) => {
    setCurrentWorkout({...currentWorkout, name: name});
  };

  const handleWorkoutNotesChanged = (notes: string) => {
    setCurrentWorkout({...currentWorkout, notes: notes});
  };

  const handleUnsavedChangesOnNavigation = () => {
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
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
      } else {
        dispatch({
          type: 'addWorkout',
          payload: [{...currentWorkout, id: uuid.v4().toString()}],
        });
      }
      navigation.navigate('Workouts');
    }
  };

  const handleRemoveMovePressed = (moveIndex: number) => {
    const newMoves = [
      ...currentWorkout.moves.slice(0, moveIndex),
      ...currentWorkout.moves.slice(moveIndex + 1),
    ];
    setCurrentWorkout({...currentWorkout, moves: newMoves});
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
        value={currentWorkout.name}
        placeholder="Name"
        onChangeText={text => handleWorkoutNameChanged(text)}
      />
      <Text style={styles.textFieldHeader}>Notes</Text>
      <TextInput
        style={styles.textField}
        value={currentWorkout.notes}
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
      <WorkoutMoveList currentWorkout={currentWorkout} />
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
