import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Workout} from './types';
import React, {useContext, useState} from 'react';
import uuid from 'react-native-uuid';
import {IconButton} from './IconButton';
import {Context} from './WorkoutStore';

interface WorkoutMoveListProps {
  currentWorkout: Workout;
}

export const WorkoutMoveList = ({
  currentWorkout: parentWorkout,
}: WorkoutMoveListProps) => {
  const [currentWorkout, setCurrentWorkout] = useState<Workout>(parentWorkout);
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
    // setCurrentWorkout({...currentWorkout, moves: newMoves});
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
    // setCurrentWorkout({...currentWorkout, moves: newMoves});
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

    // setCurrentWorkout({...currentWorkout, moves: newMoves});
  };

  const handleRemoveMovePressed = (moveIndex: number) => {
    const newMoves = [
      ...currentWorkout.moves.slice(0, moveIndex),
      ...currentWorkout.moves.slice(moveIndex + 1),
    ];
    // setCurrentWorkout({...currentWorkout, moves: newMoves});
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

  return currentWorkout.moves.map((move, moveIndex) => (
    <View
      key={uuid.v4().toString()}
      style={{flexDirection: 'row', padding: 6, gap: 6}}>
      <TextInput
        style={styles.textField}
        keyboardType="number-pad"
        clearTextOnFocus
        maxLength={2}
        value={move.series.toString()}
        onChangeText={text => handleMoveSeriesChanged(text, moveIndex)}
      />
      <Text
        style={{
          flexShrink: 1,
          height: '100%',
          textAlign: 'center',
          verticalAlign: 'middle',
          padding: 0,
        }}>
        x
      </Text>
      <TextInput
        style={styles.textField}
        keyboardType="number-pad"
        clearTextOnFocus
        maxLength={2}
        value={move.repetitions.toString()}
        onChangeText={text => handleMoveRepetitionsChanged(text, moveIndex)}
      />
      <TextInput
        style={{...styles.textField, flexShrink: 0, flexGrow: 1}}
        clearButtonMode="while-editing"
        clearTextOnFocus
        allowFontScaling
        placeholder="Name"
        value={move.move.name}
        onChangeText={text => handleMoveNameChanged(text, moveIndex)}
      />
      <TextInput
        style={styles.textField}
        keyboardType="number-pad"
        clearTextOnFocus
        maxLength={3}
        placeholder="Weight"
        value={move.weight.toString()}
        onChangeText={text => handleMoveWeightChanged(text, moveIndex)}
      />
      <Text
        style={{
          flexShrink: 1,
          height: '100%',
          textAlign: 'center',
          verticalAlign: 'middle',
          padding: 0,
        }}>
        kg
      </Text>
      <IconButton
        color="#DD0000"
        icon="delete-outline"
        onPress={() => handleRemoveMovePressed(moveIndex)}
      />
    </View>
  ));
};
