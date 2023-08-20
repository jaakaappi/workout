import {StyleSheet, Text, TextInput, View} from 'react-native';
import {MoveUnit, WorkoutMove} from './types';
import React, {useState} from 'react';
import {IconButton} from './components/IconButton';
import {ModalSelect} from './components/ModalSelect';

interface WorkoutMoveListProps {
  moves: WorkoutMove[];
  updateWorkoutMoves: (newMoves: WorkoutMove[]) => void;
}

export const EditWorkoutMoveList = ({
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

  const handleMoveAmountChanged = (newValue: string, moveIndex: number) => {
    const cleanedValue = newValue
      .replace(/[^0-9]/g, '')
      .split(',')[0]
      .split('.')[0];

    const oldMove = moves[moveIndex];
    const newMoves: WorkoutMove[] = [
      ...moves.slice(0, moveIndex),
      {
        ...oldMove,
        amount:
          cleanedValue != ''
            ? Math.floor(parseFloat(cleanedValue)).toString()
            : '',
      },
      ...moves.slice(moveIndex + 1),
    ];

    updateWorkoutMoves(newMoves);
  };

  const handleMoveAmountUnitChanged = (newValue: string, moveIndex: number) => {
    const oldMove = moves[moveIndex];
    const newMoves: WorkoutMove[] = [
      ...moves.slice(0, moveIndex),
      {
        ...oldMove,
        move: {...oldMove.move, unit: newValue as MoveUnit},
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
      // padding: 8,
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
    <View style={{gap: 6}}>
      {moves.map((move, moveIndex) => (
        <View
          key={moveIndex}
          style={{flexDirection: 'row', gap: 6}}>
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
            style={{...styles.textField, flexShrink: 0.5, flexGrow: 1}}
            placeholder="Name"
            defaultValue={move.move.name}
            onChangeText={text => handleMoveNameChanged(text, moveIndex)}
          />
          <TextInput
            style={styles.textField}
            keyboardType="number-pad"
            clearTextOnFocus
            maxLength={3}
            placeholder="Amount"
            defaultValue={move.amount.toString()}
            onChangeText={text => handleMoveAmountChanged(text, moveIndex)}
          />
          <ModalSelect
            title="Select move amount unit"
            currentValue={{label: move.move.unit, value: move.move.unit}}
            values={['kg', 's'].map(value => ({label: value, value}))}
            onValueSelected={newValue =>
              handleMoveAmountUnitChanged(newValue, moveIndex)
            }
          />
          <IconButton
            color="#DD0000"
            icon="delete-outline"
            onPress={() => handleRemoveMovePressed(moveIndex)}
          />
        </View>
      ))}
    </View>
  );
};
