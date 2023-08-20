import {Text} from 'react-native';
import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from './IconButton';

interface HeaderProps {
  onBackPressed: () => void;
  text?: string;
  rightComponent?: ReactNode;
}

export const Header = ({onBackPressed, text, rightComponent}: HeaderProps) => {
  const styles = StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 6,
      backgroundColor: '#ffffff',
    },
    text: {
      textAlign: 'center',
      verticalAlign: 'middle',
      fontSize: 20,
    },
  });

  return (
    <View style={styles.mainContainer}>
      <IconButton
        icon="arrow-left-thin"
        onPress={onBackPressed}
      />
      {text && (
        <Text
          style={styles.text}
          ellipsizeMode="tail">
          {text}
        </Text>
      )}
      {rightComponent ?? <View />}
    </View>
  );
};
