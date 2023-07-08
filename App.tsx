import React, { useEffect, useInsertionEffect, useState } from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { getWorkouts } from './workouts';
import { Workout } from './types';

const App = (): JSX.Element => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    getWorkouts().then((data) => setWorkouts(data)).catch((exception) => console.error(exception));
  }, [])

  return (
    <SafeAreaView >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />{workouts.length == 0 ?
        <View>
          <Text>No saved workouts</Text>
          <Button title='Add workout'></Button>
        </View> :
        <FlatList
          data={workouts}
          renderItem={({ item }) => <View><Text>{item.name}</Text></View>}
          keyExtractor={(_, index) => index.toString()}>
        </FlatList>}
    </SafeAreaView>
  );
}

export default App;
