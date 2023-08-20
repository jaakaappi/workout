import {StyleSheet, Text, TextInput, View} from 'react-native';
import {WorkoutMove} from './types';
import React, {useState} from 'react';
import {IconButton} from './IconButton';

interface WorkoutMoveListProps {
  moves: WorkoutMove[];
  updateWorkoutMoves: (newMoves: WorkoutMove[]) => void;
}

export const WorkoutMoveList = ({
  moves,
  updateWorkoutMoves,
}: WorkoutMoveListProps) => {
  const handleMoveSeriesChanged = (newValue: string, moveIndex: number) => {
    const cleanedValue = newValue
      .replace(/[^0-9]/g, '')
      .split(',')[0]
      .split('.')[0];

    const oldMove = moves[moveIndex];
    const newMoves = [
      ...moves.slice(0, moveIndex),
      {
        ...oldMove,
        series:
          cleanedValue != ''
            ? Math.floor(parseFloat(cleanedValue)).toString()
            : '',
      },
      ...moves.slice(moveIndex + 1),
    ];
    updateWorkoutMoves(newMoves);
  };

  const handleMoveRepetitionsChanged = (
    newValue: string,
    moveIndex: number,
  ) => {
    const cleanedValue = newValue
      .replace(/[^0-9]/g, '')
      .split(',')[0]
      .split('.')[0];

    const oldMove = moves[moveIndex];
    const newMoves = [
      ...moves.slice(0, moveIndex),
      {
        ...oldMove,
        repetitions:
          cleanedValue != ''
            ? Math.floor(parseFloat(cleanedValue)).toString()
            : '',
      },
      ...moves.slice(moveIndex + 1),
    ];
    updateWorkoutMoves(newMoves);
  };

  const handleMoveNameChanged = (newValue: string, moveIndex: number) => {
    const oldMove = moves[moveIndex];
    const newMoves = [
      ...moves.slice(0, moveIndex),
      {...oldMove, move: {...oldMove.move, name: newValue}},
      ...moves.slice(moveIndex + 1),
    ];

    updateWorkoutMoves(newMoves);
  };

  const handleMoveWeightChanged = (newValue: string, moveIndex: number) => {
    const cleanedValue = newValue
      .replace(/[^0-9]/g, '')
      .split(',')[0]
      .split('.')[0];

    const oldMove = moves[moveIndex];
    const newMoves = [
      ...moves.slice(0, moveIndex),
      {
        ...oldMove,
        weight:
          cleanedValue != ''
            ? Math.floor(parseFloat(cleanedValue)).toString()
            : '',
      },
      ...moves.slice(moveIndex + 1),
    ];

    updateWorkoutMoves(newMoves);
  };

  const handleRemoveMovePressed = (moveIndex: number) => {
    const newMoves = [
      ...moves.slice(0, moveIndex),
      ...moves.slice(moveIndex + 1),
    ];
    updateWorkoutMoves(newMoves);
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

  const [tempValue, setTempValue] = useState('');

  return moves.map((move, moveIndex) => (
    <View
      key={moveIndex}
      style={{flexDirection: 'row', padding: 6, gap: 6}}>
      <TextInput
        style={styles.textField}
        keyboardType="number-pad"
        clearTextOnFocus
        maxLength={2}
        defaultValue={move.series.toString()}
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
        defaultValue={move.repetitions.toString()}
        onChangeText={text => handleMoveRepetitionsChanged(text, moveIndex)}
      />
      <TextInput
        style={{...styles.textField, flexShrink: 0, flexGrow: 1}}
        placeholder="Name"
        defaultValue={move.move.name}
        onChangeText={text => handleMoveNameChanged(text, moveIndex)}
      />
      <TextInput
        style={styles.textField}
        keyboardType="number-pad"
        clearTextOnFocus
        maxLength={3}
        placeholder="Weight"
        defaultValue={move.weight.toString()}
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
