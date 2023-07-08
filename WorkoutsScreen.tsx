import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { Workout } from './types';
import { getWorkouts } from './workouts';

export const WorkoutsScreen = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    getWorkouts()
      .then(data => setWorkouts(data))
      .catch(exception => console.error(exception));
  }, []);

  return (
    <>
      {workouts.length == 0 ? (
        <View>
          <Text>No saved workouts</Text>
          <Button title="Add workout"></Button>
        </View>
      ) : (
        <FlatList
          data={workouts}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}></FlatList>
      )}
    </>
  );
};
