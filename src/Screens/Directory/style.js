import { StyleSheet } from "react-native";
import { styleConstants as Constants, HeightMatrix, Matrix, WidthMatrix } from '../../Constants/styleConstants'


export const styles = StyleSheet.create({
    mainContainner: {
      flex: 1,
    },
    mainTitle: {
      fontSize: Constants.FontSize.xlarge,
      marginVertical: HeightMatrix(10),
      paddingHorizontal: WidthMatrix(10),
    },
    listContainer: {
      flexDirection:"row",
      alignItems:"center",
      padding:WidthMatrix(5)
    },
    image: {
      height: (Constants.ScreenSize.height * 40) / Constants.baseheight,
      width: (Constants.ScreenSize.width * 40) / Constants.baseWidth,
      borderRadius: 30,
      margin: (Constants.ScreenSize.width * 10) / Constants.baseWidth,
    },
    textInput: {
      backgroundColor: 'lightgray',
      borderRadius: 20,
      margin: Matrix(10),
      paddingHorizontal: Matrix(10),
      paddingVertical: HeightMatrix(6)
    },
    imageContainer:{
    },
    nameDesigationContainer:{
      // self
    },
    callIcon:{
     padding:Matrix(10),
     position:"absolute",
     right:10
    },
    nameText:{
      fontSize:Constants.FontSize.medium,
      fontWeight:Constants.FontWeight.secondary
    },
    deginationText:{
      fontSize:Constants.FontSize.small
    }
  
  })