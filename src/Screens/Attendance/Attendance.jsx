import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MainHeader from '../../Components/MainHeader';
import TodayAttendance from './TodayAttendance';
import AttendanceAprovel from './AttendanceAprovel';

const Attendance = ({navigation}) => {
  const [isScreen, setIsScreen] = useState(true);

  return (
    <View style={styles.container}>
      <MainHeader
        isScreen={isScreen}
        setIsScreen={setIsScreen}
        navigation={navigation}
        isToggle={true}
        isHome={true}
      />
      {isScreen ? (
        <TodayAttendance navigation={navigation} />
      ) : (
        <AttendanceAprovel />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Attendance;
