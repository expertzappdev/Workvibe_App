import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import { styleConstants as Constants, Percentage, HeightMatrix, WidthMatrix} from '../../Constants/styleConstants';

export default function TodayAttendance() {
    
    const [currentTime, setCurrentTime] = useState(new Date());
    const [checkInOutData, setCheckInOutData] = useState([]);
    const [isClockIn, setIsclockIn] = useState(true);
    const [timerRunning, setTimerRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        let intervalId;

        if (timerRunning) {
            intervalId = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [timerRunning]);

    const formatElapsedTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedTime = [
            hours > 0 && `${hours}h`,
            minutes > 0 && `${minutes}m`,
            `${remainingSeconds}s`
        ].filter(Boolean).join(' ');

        return formattedTime || '0h 0m 0s';
    };

    const ClockInOutItem = ({ item }) => {
        const { type, time, location, elapsedTime } = item;

        return (
            <View style={styles.clockInOutItemContainer}>
                <Ionicons name={type === 'clockIn' ? 'md-log-in' : 'md-log-out'} size={24} color="#333" style={styles.iconStyle} />
                <Text style={styles.timeTextStyle}>{formatElapsedTime(elapsedTime)}</Text>
                <Feather name="circle" size={12} color={type === 'clockIn' ? 'green' : 'red'} style={[styles.circleStyle, { backgroundColor: type === 'clockIn' ? 'green' : 'red' }]} />
                <Text>{location}</Text>
            </View>
        );
    };

    const handleCheckInOutPress = () => {
        const newCheckInOutData = [
            ...checkInOutData,
            { id: `${checkInOutData.length + 1}`, type: isClockIn ? 'clockIn' : 'clockOut', time: currentTime.toLocaleTimeString(), location: "Headquarters", elapsedTime }
        ];
        setCheckInOutData(newCheckInOutData);
        setIsclockIn(!isClockIn);
        setTimerRunning(isClockIn); // Start or stop the timer based on clock in/out
        setElapsedTime(0); // Reset the elapsed time when clocking in/out
    };

    return (
        <View style={styles.attContainer}>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.dateText}>{currentTime.toDateString()}</Text>
                <FontAwesome name="clock-o" size={16} color="#333" style={styles.iconStyle} />
                <Text style={styles.timeText}>{formatElapsedTime(elapsedTime)}</Text>
            </View>

            <View style={styles.checkInOutContainer}>
                <FlatList
                    data={checkInOutData}
                    style={styles.checkInOutItem}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ClockInOutItem item={item} />}
                />
            </View>

            <TouchableOpacity style={styles.buttonContainer} onPress={handleCheckInOutPress}>
                <Text>{isClockIn ? "Clock In" : "Clock Out"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    attContainer: {
        width: Percentage(94),
        marginTop: HeightMatrix(10),
    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: HeightMatrix(5),
    },
    dateText: {
        fontSize: Constants.FontSize.small,
        fontWeight: "500",
    },
    timeText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    checkInOutContainer: {
        padding: Percentage(2),
        marginBottom: 20,
        borderWidth: 0.5,
        borderColor: "lightgray",
        borderRadius: WidthMatrix(10),
    },
    checkInOutItem: {
        padding: 10,
    },
    buttonContainer: {
        width: '100%',
        borderRadius: 10,
        paddingVertical: HeightMatrix(10),
        alignItems: 'center',
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: 'green',
    },
    clockInOutItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginHorizontal: WidthMatrix(10),
    },
    iconStyle: {
        paddingHorizontal: WidthMatrix(10)
    },
    timeTextStyle: {
        // You can style the time text here if needed
    },
    circleStyle: {
        borderRadius: 6,
    },
});
