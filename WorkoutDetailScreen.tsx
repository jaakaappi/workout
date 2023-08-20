import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './App';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Workout} from './types';
import Icon from 'react-native-vector-icons/Ionicons';

export const WorkoutDetailsScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {workout} = route.params as {workout: Workout};

  const styles = StyleSheet.create({
    mainContainer: {
      padding: 8,
      gap: 6,
      color: 'black',
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
      borderWidth: 1,
      borderColor: 'grey',
    },
    moveCountCell: {
      justifyContent: 'center',
    },
    moveTextCell: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
    },
    deleteButton: {
      alignContent: 'center',
      alignSelf: 'flex-end',
      width: '100%',
    },
    weightCell: {
      flexDirection: 'row',
      gap: 8,
    },
    iconContainer: {
      verticalAlign: 'middle',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    blackText: {
      color: 'black',
    },
  });

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textFieldHeader}>Notes</Text>
      <Text>{workout.notes.length > 0 ? workout.notes : '-'}</Text>
      <Text style={styles.textFieldHeader}>Breaks</Text>
      <Text>{workout.breaks.length > 0 ? workout.breaks : '-'}</Text>
      {workout.moves.length > 0 ? (
        <>
          <Text style={styles.textFieldHeader}>Moves</Text>
          <FlatList
            data={workout.moves}
            style={{display: 'flex'}}
            ItemSeparatorComponent={() => <View style={{height: 6}} />}
            renderItem={({item: move}) => (
              <View style={styles.moveRow}>
                <View style={styles.moveCountCell}>
                  <Text
                    style={
                      styles.blackText
                    }>{`${move.series} x ${move.repetitions}`}</Text>
                </View>
                <View style={styles.moveTextCell}>
                  <View>
                    <Text style={styles.blackText}>{move.move.name}</Text>
                    {move.notes.length > 0 ?? (
                      <Text style={styles.blackText}>{move.notes.length}</Text>
                    )}
                  </View>
                  <View style={styles.weightCell}>
                    <View style={styles.iconContainer}>
                      <Icon
                        style={styles.blackText}
                        name="barbell-outline"
                      />
                    </View>
                    <Text style={styles.blackText}>{`${move.weight}kg`}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </>
      ) : (
        <Text>No moves</Text>
      )}
      <View style={styles.deleteButton} />
    </View>
  );
};
