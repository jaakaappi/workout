import React from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconButtonProps {
  onPress: () => void;
  color?: string;
  variant?: 'filled' | 'outline' | 'plain';
  iconSide?: 'left' | 'right';
  icon: string;
  style?: ViewStyle;
  text?: string;
}

export const IconButton = ({
  onPress,
  color,
  variant = 'filled',
  iconSide = 'left',
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
      alignItems: 'center',
    },
    defaultStyle: {
      paddingVertical: 3,
      paddingHorizontal: 6,
      borderRadius: 2,
      maxHeight: 30,
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
      justifyContent: 'space-between',
    },
    text: {
      color: variant === 'filled' ? 'white' : selectedColor,
      fontSize: 16,
      textAlign: 'center',
    },
  });

  const renderIcon = () => (
    <Icon
      name={icon}
      style={{width: 20, textAlign: 'center'}}
      color={variant === 'filled' ? 'white' : selectedColor}
      size={24}
    />
  );

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
        {iconSide === 'left' && renderIcon()}
        {text && <Text style={styles.text}>{text}</Text>}
        {iconSide === 'right' && renderIcon()}
      </View>
    </Pressable>
  );
};
