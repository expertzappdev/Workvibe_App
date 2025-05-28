import { View, Text ,  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,} from 'react-native'
import React from 'react'
import MainHeader from '../../../Components/MainHeader'
import {
  AntDesign,
  Ionicons,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const data = [
  {
    date: "28 Dec",
    items: [
      {
        icon: "login",
        time: "10:04(GMT+5.5)",
        location: "Headquarters",
        status: "Pending",
        dotColor: "#daa520",
      },
    ],
  },
  {
    date: "27 Dec",
    items: [
      {
        icon: "arrow-back-circle-outline",
        time: "13:02 (GMT+5.5)",
        location: "Headquarters",
        status: "Pending",
        dotColor: "#daa520",
      },
    ],
  },
  {
    date: "26 Dec",
    items: [
      {
        icon: "numeric-2-box-outline",
        time: "10:04(GMT+5.5)",
        location: "Headquarters",
        status: "Pending",
        dotColor: "#daa520",
      },
    ],
  },
];

export default function AllAttendence({navigation}) {
  const isBAck = () =>
  {
    navigation.navigate("Attendance")
  }
  const renderDateItem = ({ item }) => (
    <View>
      <View style={styles.container}>
        <Text style={{ fontSize: 18 }}>{item.date}</Text>
      </View>
      {item.items.map((itemData, index) => (
        <View key={index} style={styles.boxContainer}>
          <View style={styles.boxText}>
            <AntDesign name={itemData.icon} size={20} color="green" />
            <Text style={{ fontSize: 17, fontWeight: "400" }}>
              {itemData.time}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: "400" }}>
              {itemData.location}
            </Text>
          </View>

          <View style={styles.backIcon}>
            {item.date === "27 Dec" && (
              <View style={styles.boxText}>
                <Ionicons
                  name="arrow-back-circle-outline"
                  size={24}
                  color="red"
                />
                <Text style={{ fontSize: 17, fontWeight: "400" }}>
                  {itemData.time}
                </Text>
                <Text style={{ fontSize: 17, fontWeight: "400" }}>
                  {itemData.location}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.borderStyle}></View>
          {itemData.status && (
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: "10%",
                marginTop: 10,
              }}
            >
              <Octicons name="dot-fill" size={24} color={itemData.dotColor} />
              <Text
                style={{
                  marginLeft: "10%",
                  fontSize: 17,
                  color: itemData.dotColor,
                  fontWeight: "bold",
                }}
              >
                {itemData.status}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );



  return (
    <SafeAreaView>
    <View style={styles.container}>
      <MainHeader isBack={isBAck} screenName={"My Attedance"}/>
    </View>
    
     <ScrollView>
       {/* FlatList */}
       <FlatList
         data={data}
         keyExtractor={(item, index) => index.toString()}
         renderItem={renderDateItem}
       />
     </ScrollView>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
  },
  boxContainer: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    height: 200,
    width: "90%",
    borderRadius: 10,
  },
  boxText: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10,
  },
  backIcon: {
    marginLeft: 5,
  },
  borderStyle: {
    marginTop: 15,
    alignSelf: "center",
    height: 1,
    width: "82%",
    borderWidth: 0.1,
    borderRadius: 0.1,
  },
  additionalItem: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10,
  },
});