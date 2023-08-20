import React, {useContext, useMemo} from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './App';
import {Context} from './WorkoutStoreContext';
import {IconButton} from './components/IconButton';

export const WorkoutsScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
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
    settingsButton: {
      alignContent: 'center',
      alignSelf: 'flex-end',
      width: '100%',
    },
  });

  return (
    <View style={{height: '100%'}}>
      {workouts.length === 0 ? (
        <View style={{flex: 1, padding: 8, alignItems: 'center'}}>
          <Text>No saved workouts</Text>
        </View>
      ) : (
        <FlatList
          data={workouts}
          style={{width: '100%'}}
          ItemSeparatorComponent={() => <View style={{height: 6}} />}
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
                  <Text>{`${item.moves.length} moves`}</Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="head">
                    {item.notes || 'No notes'}
                  </Text>
                </View>
                <View style={styles.workoutRowButtonContainer}>
                  <IconButton
                    icon="square-edit-outline"
                    variant="plain"
                    onPress={() =>
                      navigation.navigate('EditWorkout', {workout: item})
                    }
                  />
                </View>
              </View>
            </Pressable>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
      <View style={styles.settingsButton}>
        <Button
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </View>
  );
};
