import React from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconButtonProps {
  onPress: () => void;
  color?: string;
  variant?: 'filled' | 'outline' | 'plain';
  icon: string;
  style?: ViewStyle;
  text?: string;
}

export const IconButton = ({
  onPress,
  color,
  variant = 'filled',
  icon,
  style,
  text,
}: IconButtonProps) => {
  const selectedColor = color ?? '#2296F3';

  const styles = StyleSheet.create({
    mainContainer: {
      verticalAlign: 'middle',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    defaultStyle: {
      padding: 4,
      paddingHorizontal: 6,
      borderRadius: 2,
    },
    filled: {
      backgroundColor: selectedColor,
    },
    outline: {
      borderColor: selectedColor,
      borderWidth: 1,
    },
    contentContainer: {
      flexDirection: 'row',
    },
    text: {
      color: variant === 'filled' ? 'white' : selectedColor,
      fontSize: 16,
      textAlign: 'center',
      paddingHorizontal: 6,
    },
  });

  return (
    <Pressable
      style={{
        ...styles.defaultStyle,
        ...(variant === 'plain'
          ? {}
          : variant === 'filled'
          ? styles.filled
          : styles.outline),
        ...style,
        ...styles.mainContainer,
      }}
      onPress={onPress}>
      <View style={styles.contentContainer}>
        <Icon
          name={icon}
          color={variant === 'filled' ? 'white' : selectedColor}
          size={24}
        />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Pressable>
  );
};
