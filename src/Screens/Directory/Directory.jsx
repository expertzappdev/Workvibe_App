import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';


export default function Directory() {
  // const [searchText, setSearchText] = useState('');
  // const [data, setData] = useState([
  //   { id: '1', name: 'Pranav Onkar', designation: "Junior Software Enginner" },
  //   { id: '2', name: 'Govind Sir', designation: "Senior Software Enginner" },
  //   { id: '3', name: 'Deepak', designation: "Intern" },
  //   { id: '4', name: 'Aman', designation: "Trainee" },
  // ]);

  // const handleSearch = (text) => {
  //   setSearchText(text);
  //   const filteredData = data.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
  //   setData(filteredData);
  // };

  // const renderItem = ({ item }) => {
  //   return (
  //     <View style={styles.listContainer}>
  //       <TouchableOpacity style={styles.imageContainer}>
  //       <Image style={styles.image} source={require("../../Assets/Images/person.jpg")} />
  //       </TouchableOpacity>
  //       <TouchableOpacity>
  //         <Text style={styles.nameText}>{item.name}</Text>
  //         <Text style={styles.deginationText}>{item.designation}</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.callIcon}>
  //       <Ionicons name="call" size={14} color="black"  />
  //       </TouchableOpacity>
  //     </View>
  //   )

  // }


  // return (
  //   <View style={styles.mainContainner} >
  //     <Text style={styles.mainTitle} >Directory</Text>
  //     <View>
  //       <TextInput
  //         style={styles.textInput}
  //         placeholder="Search People..."
  //         value={searchText}
  //         onChangeText={handleSearch}
  //       />
  //       <FlatList
  //         data={data}
  //         keyExtractor={item => item.id}
  //         renderItem={renderItem}
  //       />
  //     </View>
  //   </View>
  // )
  return (
   <View style={{flex :1,justifyContent:"center",alignItems:"center" }}>
    <Text>Coming soon...</Text>
  </View>
  )
}


