import React, {useState} from 'react';
import {IconButton} from './IconButton';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

interface ModalSelectProps {
  title?: string;
  currentValue: {label: string; value: string};
  values: {label: string; value: string}[];
  onValueSelected?: (newValue: string) => void;
}

export const ModalSelect = ({
  title = 'Select',
  currentValue,
  onValueSelected,
  values,
}: ModalSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#50808080',
    },
    modalHeaderContainer: {
      flexDirection: 'row',
    },
    visibleContentView: {
      minWidth: '50%',
      minHeight: '30%',
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalHeaderText: {
      textAlign: 'center',
      color: 'black',
      fontSize: 20,
      paddingHorizontal: 20,
      paddingVertical: 8,
    },
    modalContentContainer: {
      padding: 8,
    },
    separator: {
      width: '100%',
      height: 1,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: 'grey',
    },
    itemText: {
      padding: 6,
      color: 'black',
    },
  });

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}>
        <View style={styles.centeredView}>
          <View style={styles.visibleContentView}>
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.modalHeaderText}>{title}</Text>
              <IconButton
                icon="close"
                variant="plain"
                color="grey"
                onPress={() => {}}
              />
            </View>
            <View style={styles.modalContentContainer}>
              {values.map((value, index) => (
                <TouchableHighlight
                  key={'select' + value + index}
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() => {
                    onValueSelected?.(value.value);
                    setIsOpen(false);
                  }}>
                  <View>
                    <Text style={styles.itemText}>{value.label}</Text>
                    {index !== values.length - 1 && (
                      <View style={styles.separator} />
                    )}
                  </View>
                </TouchableHighlight>
              ))}
            </View>
          </View>
        </View>
      </Modal>
      <IconButton
        color="grey"
        icon="chevron-down"
        variant="outline"
        iconSide="right"
        style={{minWidth: 60, paddingHorizontal: 6}}
        text={currentValue.label}
        onPress={() => setIsOpen(true)}
      />
    </>
  );
};
