/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import {UserSelectors} from '../../Redux/UserRedux';
import {clockSelectors} from '../../Redux/ClockRedux/Selectors';
import {buttonColor} from '../../Constants/Button/buttonColor';
import CustomButton from '../../Components/Button';
import {buttonTitles} from '../../Constants/Button/buttomTitles';
import {ClockAction} from '../../Redux/ClockRedux/Actions';
import {
  styleConstants as Constants,
  Percentage,
  HeightMatrix,
  WidthMatrix,
  Matrix,
} from '../../Constants/styleConstants';

export default function TodayAttendance({navigation}) {
  const employeeId = useSelector(UserSelectors.selectEmployeeId);
  const isClockIn = useSelector(clockSelectors.selectIsUserClockIn);
  const attendanceId = useSelector(clockSelectors.selectAttendaceId);
  const clockInTime = useSelector(clockSelectors.selectClockInTime);
  const userAttendance = useSelector(clockSelectors.selectUserAttendance);
  const [timeDifference, setTimeDifference] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [checkInOutData, setCheckInOutData] = useState(
    userAttendance ? userAttendance : [],
  );
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [locationStatus, setLocationStatus] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();
  var watchID;


  useEffect(() => {
    dispatch(ClockAction.getUserAttendance(employeeId));
    requestLocationPermission();
    getOneTimeLocation();
    setCurrentTime(new Date());
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  useEffect(() => {
    if (isLoader) {
      openScanScreen();
    }
  }, [currentLatitude,currentLongitude, isLoader]);

  useEffect(() => {
    if (userAttendance && userAttendance.length > 0) {
      const formattedData = userAttendance.flatMap(item => {
        const entries = [];
        if (item.clockInTime) {
          entries.push({
            type: 'clockIn',
            time: formatDateString(item.clockInTime),
            location: item.clockinlocation || '- : -',
          });
        }
        if (item.clockOutTime) {
          entries.push({
            type: 'clockOut',
            time: formatDateString(item.clockOutTime),
            location: item.clockoutlocation || '- : -',
          });
        }
        return entries;
      });

      setCheckInOutData(formattedData);
    }
  }, [userAttendance]);

  // useEffect(() => {
  //   const calculateTimeDifference = () => {
  //     const currentTimeTemp = new Date();
  //     const clockInTimeStr = `${clockInTime}`;
  //     const parsedClockInTime = new Date(clockInTimeStr);
  //     let totalDifferenceInMilliseconds = 0;

  //     checkInOutData.forEach(item => {
  //       const clockInTimetemp = item.clockInTime;
  //       const clockOutTime = item.clockOutTime;
  //       const clockInTimeStr = `${clockInTimetemp}`;
  //       const clockOutTimeStr = `${clockOutTime}`;

  //       if (clockOutTime) {
  //         const parsedClockInTime = new Date(clockInTimeStr);
  //         const parsedClockOutTime = new Date(clockOutTimeStr);
  //         console.log('parsedClockInTime', parsedClockInTime);

  //         totalDifferenceInMilliseconds +=
  //           parsedClockOutTime - parsedClockInTime;
  //       }
  //       console.log(
  //         'TT01 : totalDifferenceInMilliseconds',
  //         totalDifferenceInMilliseconds,
  //       );
  //     });
  //     const differenceInMilliseconds = totalDifferenceInMilliseconds;

  //     // console.log(
  //     //   'TT01 : differenceInMilliseconds',
  //     //   differenceInMilliseconds,currentTimeTemp
  //     // );

  //     const hours = Math.floor(differenceInMilliseconds / 3600000);
  //     const minutes = Math.floor((differenceInMilliseconds % 3600000) / 60000);
  //     const seconds = Math.floor((differenceInMilliseconds % 60000) / 1000);

  //     const formattedDifference = `${hours}h ${minutes}m ${seconds}s`;

  //     setTimeDifference(formattedDifference);
  //   };

  //   if (isClockIn) {
  //     calculateTimeDifference();
  //     const timerId = setInterval(calculateTimeDifference, 1000);
  //     return () => clearInterval(timerId);
  //   }
  // }, [isClockIn, clockInTime]);

  const formatDateString = dateString => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
      timeZone: 'Asia/Kolkata',
      hour12: false,
    };

    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate;
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getOneTimeLocation();
          subscribeLocationLocation();
        } else {
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  var location = 1;

  const openScanScreen = () => {
    setIsLoader(true);
    if (currentLatitude !== null && currentLongitude !== null) {
      if (!isClockIn) {
        var userData = {
          id: employeeId,
          currentLatitude: currentLatitude,
          currentLongitude: currentLongitude,
          location: location,
        };
        navigation.navigate('ScanScreen', {
          clockInRequest: userData,
          navigation: navigation,
        });
      } else {
        var userData = {
          attendanceId: attendanceId,
          currentLatitude: currentLatitude,
          currentLongitude: currentLongitude,
          location: location,
        };
        navigation.navigate('ScanScreen', {
          clockOutRequest: userData,
          navigation: navigation,
        });
      }
      setIsLoader(false);
    } else {
      requestLocationPermission();
    }
  };

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      position => {
        setLocationStatus('You are Here');

        const Longitude = JSON.stringify(position.coords.longitude);
        const Latitude = JSON.stringify(position.coords.latitude);

        setCurrentLongitude(Longitude);
        setCurrentLatitude(Latitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        setLocationStatus('You are Here');

        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  const ClockInOutItem = ({item}) => {
    const {type, time, location} = item;

    return (
      <View style={styles.clockInOutItemContainer}>
        <FeatherIcon
          name={type === 'clockIn' ? 'log-in' : 'log-out'}
          size={24}
          color={type === 'clockIn' ? 'green' : 'red'}
        />
        <Text>{time}</Text>
        <FontAwesomeIcon
          name="circle"
          size={10}
          style={styles.circleStyle}
          color={type === 'clockIn' ? 'green' : 'red'}
        />
        <Text>{location}</Text>
      </View>
    );
  };

  return (
    <View style={styles.attContainer}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateText}>{currentTime.toDateString()}</Text>
        <Text style={{paddingHorizontal: 10}}>{timeDifference}</Text>
      </View>

      <View style={styles.checkInOutContainer}>
        <FlatList
          data={
            checkInOutData.length > 0
              ? checkInOutData
              : [
                  {
                    id: 'defaultClockIn',
                    type: 'clockIn',
                    time: '- : -',
                    location: '- : -',
                  },
                  {
                    id: 'defaultClockOut',
                    type: 'clockOut',
                    time: '- : -',
                    location: '- : -',
                  },
                ]
          }
          style={styles.checkInOutItem}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ClockInOutItem item={item} />}
        />
      </View>
      <CustomButton
        onPress={() => openScanScreen()}
        title={!isClockIn ? buttonTitles.clockIn : buttonTitles.clockOut}
        isLoader={isLoader}
        color={
          !isClockIn
            ? buttonColor.clockInButtonColor
            : buttonColor.clockOutButtonColor
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  attContainer: {
    width: Percentage(90),
    marginTop: HeightMatrix(10),
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: HeightMatrix(5),
  },
  dateText: {
    fontSize: Constants.FontSize.small,
    fontWeight: '500',
  },
  checkInOutContainer: {
    padding: Percentage(2),
    marginVertical: HeightMatrix(10),
    borderWidth: 0.8,
    borderColor: Constants.Colors.borderColor,
    borderRadius: WidthMatrix(4),
  },
  checkInOutItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: WidthMatrix(10),
    marginVertical: HeightMatrix(1.5),
    backgroundColor: 'lightgray',
    borderRadius: 8,
  },
  buttonText: {
    paddingVertical: Matrix(5),
    color: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: HeightMatrix(10),
    marginVertical: HeightMatrix(10),
    fontSize: Constants.FontSize.medium,
    fontFamily: Constants.FontFamily.SFProDisplaySemibold,
  },
  screenButton: {
    borderRadius: Matrix(10),
    paddingVertical: HeightMatrix(15),
    borderWidth: 1,
    borderColor: '#bdbfbf',
    marginVertical: HeightMatrix(10),
  },
  screenButtonText: {
    paddingHorizontal: WidthMatrix(20),
    fontSize: Constants.FontSize.medium,
    fontFamily: Constants.FontFamily.SFProDisplaySemibold,
  },
  clockInOutItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: WidthMatrix(10),
  },
  circleStyle: {
    borderRadius: 6,
  },
});
