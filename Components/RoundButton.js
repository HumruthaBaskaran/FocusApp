import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

function RoundButton({radius, text, onClick}){
    return(
    <TouchableOpacity 
        style={[{width:(radius*2), height:(radius*2), borderRadius:radius}, styles.roundButtons]}
        onPress={onClick}
        >
        <Text style={{color:'#fff'}}>{text}</Text>
    </TouchableOpacity>
    )
}

export default RoundButton;