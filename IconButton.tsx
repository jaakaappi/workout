import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface IconButtonProps {
  onPress: () => void;
  color?: string;
}

export const IconButton = ({onPress, color}: IconButtonProps) => {
  const styles = StyleSheet.create({
    mainContainer: {
      padding: 8,
      gap: 6,
      backgroundColor: color ?? '#2296F3',
      borderRadius: 2,
      textAlign: 'center',
    },
  });

  return (
    <Pressable
      style={styles.mainContainer}
      onPress={onPress}>
      <Icon
        name="delete"
        color="white"
      />
    </Pressable>
  );
};
