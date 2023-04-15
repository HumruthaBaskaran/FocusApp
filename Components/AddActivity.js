import React, {useState, useEffect} from "react";
import { Text, TextInput, View, TouchableOpacity, Alert, FlatList  } from "react-native";
import styles from "./styles";

const AddActivity = ({route, navigation}) => {
    const [activityList, setActivityList] = useState([])
    const [activity, setActivity] = useState(null)
    

    useEffect(()=>{
        if(route.params?.focusedList){
            const {focusedList, activity} = route.params;
            setActivityList(focusedList)
            setActivity(activity)
        }
    },[activityList])

    function HistoryItem({item}){
        return(
            <Text style={{fontSize:18, color:'#fff' }}>- {item}</Text>
        )
    }

    function onClear(){
        Alert.alert("Warrning!!","Are you Sure you want to clear all your data", [
            {
                text:"Yes",
                onPress: ()=>{
                    setActivityList([])
                    navigation.navigate({
                        name:'Home',
                        params: {activity, isCleared:true},
                        merge: true
                    })
                }
            },
            {
                text:'No',
                onPress: ()=>{}
            }
        ])
        
    }


    return(
        <View style={styles.addActivityContainer}>
            <View style={{flex:1, flexDirection:"row", marginTop:30, justifyContent:'space-between', alignItems:'center',}}>
                <TextInput 
                    style={{backgroundColor: "#fff", width:'87%', height:70,}}
                    placeholder="  What would you like to focus on?"
                    onSubmitEditing={({ nativeEvent }) => {
                        setActivity(nativeEvent.text);
                    }}
                />
                <TouchableOpacity 
                    style={[styles.roundButtons, {width:60, height:60, borderRadius:30, marginLeft:10, marginRight:0}]}
                    onPress={()=>{
                        if(!activity){ Alert.alert('Alert',"Enter an activity to focus on")}
                        else{
                            navigation.navigate({
                                name:'Home',
                                params: {activity, isCleared:false},
                                merge: true
                            })
                        }
                    }}    
                >
                    <Text style={{fontSize:24, color:'#fff'}}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:4, marginLeft:-70}}>
                <Text style={{fontSize:20, color:'#fff'}}>Things you've focused on:</Text>
                <View style={{justifyContent:'flex-start'}}>
                <FlatList
                    style={{ flex: 1, }}
                    contentContainerStyle={{ flex: 1, alignItems: 'flex-start' }}
                    data={activityList}
                    renderItem={HistoryItem}
                />
                </View>
            </View>
            <View style={{paddingBottom:10}}>
                <TouchableOpacity style={styles.clearBox} onPress={onClear}>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>Clear List</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddActivity