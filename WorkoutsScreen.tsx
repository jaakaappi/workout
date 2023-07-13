import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import {Workout} from './types';
import {getWorkouts} from './workouts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './App';
import {TextInput} from 'react-native-gesture-handler';

export const WorkoutsScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    getWorkouts()
      .then(data => setWorkouts(data))
      .catch(exception => console.error(exception));
  }, []);

  return (
    <View>
      {workouts.length == 0 ? (
        <View>
          <Text>No saved workouts</Text>
          <Button
            title="Add workout"
            onPress={() => navigation.navigate('AddWorkout')}></Button>
        </View>
      ) : (
        <FlatList
          data={workouts}
          renderItem={({item}) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </View>
  );
};
