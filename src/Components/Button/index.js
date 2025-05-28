/* eslint-disable prettier/prettier */
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import {
  HeightMatrix,
  Percentage,
  Matrix,
  WidthMatrix,
  styleConstants as Constants,
} from '../../Constants/styleConstants';

const CustomButton = ({ onPress, title, color, isLoader }) => {
  const buttonColor = color || '#e96b5c';

  return (
    <TouchableOpacity
      style={[styles.buttonView, { backgroundColor: buttonColor }]}
      onPress={onPress}
      disabled={isLoader}>
      {isLoader ? (
        <ActivityIndicator size={22} color="#FFFFFF" style={{}}/>
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    width: Percentage(90),
    marginVertical: HeightMatrix(20),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: HeightMatrix(13),
    paddingHorizontal: WidthMatrix(4),
    borderRadius: Matrix(4),
    borderWidth: 1,
  },
  text: {
    fontSize: Constants.FontSize.medium,
    fontFamily: Constants.FontFamily.SFProDisplaySemibold,
    textAlign: 'center',
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'SFProDisplay-Regular',
    color: '#FFFFFF',
  },
});

export default CustomButton;
