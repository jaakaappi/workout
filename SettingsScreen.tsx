import React, {useContext, useMemo} from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';

import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';

import {Context} from './WorkoutStore';
import {Workout} from './types';

export const SettingsScreen = () => {
  const {state, dispatch} = useContext(Context);

  const styles = StyleSheet.create({
    mainContainter: {
      padding: 6,
      gap: 8,
    },
  });

  const handleImportPressed = () => {
    DocumentPicker.pickSingle({
      presentationStyle: 'fullScreen',
      //   copyTo: 'cachesDirectory',
    })
      .then(response => {
        RNFS.readFile(response.uri).then(value => {
          try {
            const workouts = JSON.parse(value) as Workout[];
            workouts.map(workout =>
              dispatch({type: 'addWorkout', payload: [workout]}),
            );
            console.log('Finished importing workouts');
          } catch (error) {
            console.error(`Failed to parse file: ${error}`);
          }
        });
      })
      .catch(() => {});
  };

  const handleExportPressed = () => {
    const dateTime = new Date(Date.now());
    const filePath =
      RNFS.DownloadDirectoryPath +
      `/workout-export-${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDay()}-${dateTime.getHours()}-${dateTime.getMinutes()}.json`;

    const exportJson = JSON.stringify(state.workouts);

    RNFS.writeFile(filePath, exportJson, 'utf8')
      .then(() => {
        console.log('Data exported succesfully');
      })
      .catch(err => {
        console.error(`Failed to export data: ${err}`);
      });
  };

  const handleDeleteDataPressed = () => {
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to delete all your data?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => {
            dispatch({type: 'deleteAllWorkouts', payload: []});
          },
        },
      ],
    );
  };

  return (
    <View style={styles.mainContainter}>
      <Button
        color="green"
        title="Import data"
        onPress={handleImportPressed}
      />
      <Button
        title="Export data"
        onPress={handleExportPressed}
      />
      <Button
        color="#DD0000"
        title="Delete data"
        onPress={handleDeleteDataPressed}
      />
    </View>
  );
};
