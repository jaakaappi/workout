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
import {WorkoutMove} from './types';
import {useFocusEffect} from '@react-navigation/native';
import {Context} from './WorkoutStore';

export const AddWorkoutScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const [moves, setMoves] = useState<WorkoutMove[]>([]);

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
    setMoves([
      ...moves,
      {move: {name: '', description: ''}, repetitions: 1, series: 1},
    ]);
  };

  const handleMoveSeriesChanged = (newValue: string, moveIndex: number) => {
    const oldMove = moves[moveIndex];
    setMoves([
      ...moves.slice(0, moveIndex),
      {...oldMove, series: Math.floor(parseFloat(newValue) || 1)},
      ...moves.slice(moveIndex + 1),
    ]);
  };

  const handleMoveRepetitionsChanged = (
    newValue: string,
    moveIndex: number,
  ) => {
    const oldMove = moves[moveIndex];
    setMoves([
      ...moves.slice(0, moveIndex),
      {...oldMove, repetitions: Math.floor(parseFloat(newValue) || 1)},
      ...moves.slice(moveIndex + 1),
    ]);
  };

  const handleMoveNameChanged = (newValue: string, moveIndex: number) => {
    const oldMove = moves[moveIndex];
    setMoves([
      ...moves.slice(0, moveIndex),
      {...oldMove, move: {...oldMove.move, name: newValue}},
      ...moves.slice(moveIndex + 1),
    ]);
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
    dispatch({type: 'addWorkout', payload: [{name: 'asd', description: ''}]});
    navigation.navigate('Workouts');
  };

  const styles = StyleSheet.create({
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
    <View>
      <TextInput>Name</TextInput>
      <TextInput multiline>Description</TextInput>
      {moves.length > 0 && (
        <View>
          <Text>Moves</Text>
          <Text>Series x reps, move name</Text>
          <FlatList
            data={moves}
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
