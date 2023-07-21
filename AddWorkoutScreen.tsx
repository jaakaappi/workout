import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Alert,
  BackHandler,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './App';
import {Workout, WorkoutMove} from './types';
import {useFocusEffect} from '@react-navigation/native';
import {Context} from './WorkoutStore';

export const AddWorkoutScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const [currentWorkout, setCurrentWorkout] = useState<Workout>({
    name: '',
    notes: '',
    breaks: 0,
    moves: [],
  });

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
      {move: {name: '', notes: ''}, repetitions: 1, series: 1},
    ];
    setCurrentWorkout({...currentWorkout, moves: newMoves});
  };

  const handleMoveSeriesChanged = (newValue: string, moveIndex: number) => {
    const oldMove = currentWorkout.moves[moveIndex];
    const newMoves = [
      ...currentWorkout.moves.slice(0, moveIndex),
      {...oldMove, series: Math.floor(parseFloat(newValue) || 1)},
      ...currentWorkout.moves.slice(moveIndex + 1),
    ];
    setCurrentWorkout({...currentWorkout, moves: newMoves});
  };

  const handleMoveRepetitionsChanged = (
    newValue: string,
    moveIndex: number,
  ) => {
    const oldMove = currentWorkout.moves[moveIndex];
    const newMoves = [
      ...currentWorkout.moves.slice(0, moveIndex),
      {...oldMove, repetitions: Math.floor(parseFloat(newValue) || 1)},
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
    if (currentWorkout.name.length <= 0) {
      Alert.alert(
        'Missing info',
        'At least the name of the workout is needed!',
        [{text: 'Close'}],
      );
    } else if (currentWorkout.moves.some(move => move.move.name.length <= 1)) {
      Alert.alert('Missing info', 'At least one move is missing a name!', [
        {text: 'Close'},
      ]);
    } else {
      dispatch({
        type: 'addWorkout',
        payload: [currentWorkout],
      });
      navigation.navigate('Workouts');
    }
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
    <View style={styles.mainContainer}>
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
      {currentWorkout.moves.length > 0 && (
        <View>
          <Text>Series x reps, move name</Text>
          <FlatList
            data={currentWorkout.moves}
            style={{display: 'flex'}}
            renderItem={({item: move, index: moveIndex}) => (
              <View style={{flexDirection: 'row', padding: 8, gap: 8}}>
                <TextInput
                  style={styles.textField}
                  keyboardType="number-pad"
                  clearTextOnFocus
                  autoFocus
                  maxLength={2}
                  value={move.series.toString()}
                  onChangeText={text =>
                    handleMoveSeriesChanged(text, moveIndex)
                  }
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
                  onChangeText={text =>
                    handleMoveRepetitionsChanged(text, moveIndex)
                  }
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
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      )}
      <Button
        title="Add move"
        onPress={handleAddMovePressed}
      />
      <Button
        title="Save"
        onPress={handleSavePressed}
      />
    </View>
  );
};
