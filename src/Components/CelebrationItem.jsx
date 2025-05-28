// CelebrationItem.js

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { styleConstants as Constants } from '../Constants/styleConstants';

const CelebrationItem = ({ year, date, title, imageSource }) => {
  return (
    <View style={styles.mainCentralCelebrationView}>
      <View style={styles.celebrationYearMonth}>
        <Text style={styles.celebrationYear}>{year}</Text>
        <Text>{date}</Text>
      </View>
      <View style={styles.celebrationImageTitle}>
        <Image style={styles.celebrationImage} source={imageSource} />
        <Text style={styles.celebrationTitle}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCentralCelebrationView: {
    marginTop: (Constants.ScreenSize.height * 15) / Constants.baseheight,
    width:"94%",
    flexDirection: "row",
    alignSelf:"center",
    // backgroundColor:"blue"
  },
  celebrationYear: {
    fontWeight: Constants.FontWeight.secondary,
    fontSize: 16,
  },
  celebrationImageTitle: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: Constants.Colors.white,
    width: "80%",
    borderRadius: 10,
    marginLeft: (Constants.ScreenSize.width * 10) / Constants.baseWidth,
    paddingVertical: (Constants.ScreenSize.height * 10) / Constants.baseheight,
    paddingHorizontal: (Constants.ScreenSize.width * 10) / Constants.baseWidth,
  },
  celebrationYearMonth: {
    alignSelf: "center",
    paddingHorizontal: (Constants.ScreenSize.width * 7) / Constants.baseWidth,
  },
  celebrationImage: {
    height: (Constants.ScreenSize.height * 25) / Constants.baseheight,
    width: (Constants.ScreenSize.width * 25) / Constants.baseWidth,
    paddingLeft: (Constants.ScreenSize.width * 10) / Constants.baseWidth,
    borderRadius: 10,
    alignSelf: "center",
  },
  celebrationTitle: {
    alignSelf: "center",
    paddingHorizontal: (Constants.ScreenSize.width * 10) / Constants.baseWidth,
    fontSize: Constants.FontSize.medium,
    fontWeight: "500",
  },
});

export default CelebrationItem;
