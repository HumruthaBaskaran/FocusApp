import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../utils/colors";

const styles = StyleSheet.create({
    homeContainer: {
      backgroundColor: colors.darkBlue,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom:20
    },
    timerDisplay: {
      marginTop:75,
      width:'75%',
      flex:1,
      backgroundColor: colors.darkBlue,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    progressBar:{
        width:'100%',
        height: '2%',
        backgroundColor: 'rgba(94, 132, 226, 0.3)'
    },
    timeButtonsContainer:{
        flex:1,
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    roundButtons:{ 
        borderWidth:2, 
        borderColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        margin:30
    },
    addActivityContainer: {
      backgroundColor: colors.darkBlue,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding:30
    },
    text: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#fff',
      padding: 32,
      backgroundColor: 'rgba(94, 132, 226, 0.3)',
    },
    clearBox:{
      justifyContent:'center',
      alignItems:'center',
      height:50,
      width:135,
      borderWidth:2,
      borderColor:'#fff'
    }
  })
  
  export default styles;