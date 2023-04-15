import React, {useState, useEffect}from 'react';
import { ProgressBar } from 'react-native-paper';
import {View, Text, TouchableOpacity, Alert, Vibration, Platform} from 'react-native';
import styles from './styles'
import RoundButton from './RoundButton';


const Home = ({route, navigation}) => {
    const [activity, setActivity] = useState(null)
    const [focusedList, setfocusedList] = useState([])
    const [isStarted, setIsstarted] = useState(false)
    const [isPaused, setIspaused] = useState(true)

    DEFUALT_TIME = 0.1
    const [progress, setProgress] = useState(1);
    const [minutes, setMinutes] = useState(DEFUALT_TIME)
    const [isCleared, setisCleared] = useState(false)

    const minutesToMillis = (min) => min * 1000 * 60;
    const formatTime = (time) => (time < 10 ? `0${time}` : time);
    const interval = React.useRef(null);

    const [millis, setMillis] = useState(null);

    useEffect(()=>{
        if(route.params?.activity || route.params?.isCleared){
            const {activity, isCleared} = route.params;
            setActivity(activity)
            setisCleared(isCleared)
        }
    })

    useEffect(()=>{
        setfocusedList([])
    },[isCleared])

    useEffect(()=>{
        setActivity(activity);
    },[activity])

    useEffect(() => {
        setMillis(minutesToMillis(minutes));
    }, [minutes]);
    
    useEffect(() => {
        onProgress(millis / minutesToMillis(minutes));
    }, [millis]);
    
    useEffect(() => {
        if (isPaused) {
          if (interval.current) clearInterval(interval.current);
          return;
    }
    
        interval.current = setInterval(countDown, 1000);
    
        return () => clearInterval(interval.current);
    }, [isPaused]);

  
    const countDown = () => {
      setMillis((time) => {
        if (time === 0) {
          clearInterval(interval.current);
          onEnd();
          return time;
        }
        const timeLeft = time - 1000;
        return timeLeft;
      });
    };

    function vibrate(){
        if(Platform.OS === 'ios'){
            const interval = setInterval(()=>Vibration.vibrate(), 1000);
            setTimeout(()=> clearInterval(interval),10000)
        }
        else{
            Vibration.vibrate(10000)
        }
    }
    function onProgress(){
        setProgress(minutes)
    }
    function reset(){
        setMinutes(DEFUALT_TIME)
        setMillis(minutesToMillis(minutes))
        setProgress(1)
        setActivity(null)
        setIsstarted(false)
        setIspaused(true)
    }
    function onEnd(){
        addFocus();
        vibrate();
        Alert.alert("Done :)", "Well done!!! You did it",[
            {
                text:"OK",
                onPress: ()=> {
                    reset();
                    Vibration.cancel();
                }
            }
        ])
   }

    function onCancel(){
        Alert.alert("Cancel", "Activity canceled",[
            {
                text:"OK",
                onPress: ()=> {
                    reset();
                    navigation.navigate('AddActivity', {focusedList, activity:null}, merge=true)
                }
            }
        ])
        
    }

    const addFocus = ()=>{
        setfocusedList(newList => [...focusedList,activity])
    }

    function changeTime(mins){
        setMinutes(mins)
        setProgress(1)
        setIsstarted(false)
        setIspaused(true)
    }

    function Start(){
        setIsstarted(true)
        setIspaused(false)
    }
    

    const minute = Math.floor(millis / 1000 / 60) % 60;
    const seconds = Math.floor(millis / 1000) % 60;

    

  return(
    <View style={styles.homeContainer}>
    <View style={styles.timerDisplay}>
        <Text style={styles.text}>
            {formatTime(minute)}:{formatTime(seconds)}
        </Text>
    </View>
    <TouchableOpacity 
        style={{backgroungColor: '#fff', justifyContent:'center', alignItems:"center",flex:1}}
        onPress={()=>{
            if(isStarted && activity && millis){
                Alert.alert("Alert","You are focusing on a activity. If you want to change the activity, cancel the current activity.")
            }
            else {
                reset()
                navigation.navigate('AddActivity', {focusedList, activity:null}, merge=true)
            }
        }}
    >
        <Text style={{fontSize:20, color:"#fff"}}>Focusing On:</Text>
        <Text  style={{fontSize:16, color:"#fff"}}>{activity}</Text>
    </TouchableOpacity>
    <View style={{ paddingTop: 8 , width:'100%'}}>
        <ProgressBar
            progress={progress}
            color="#5E84E2"
            style={{ height: 10, width:'100%' }}
        />
    </View>
    <View style={styles.timeButtonsContainer}>
        <RoundButton radius={30} text={"10"} onClick={()=> changeTime(10)}/>
        <RoundButton radius={30} text={"15"} onClick={()=> changeTime(15)}/>
        <RoundButton radius={30} text={"20"} onClick={()=> changeTime(20)}/>
    </View>
    <View style={styles.timeButtonsContainer}>
        {!isStarted?
            <RoundButton radius={50} text={"Start"} 
                onClick={()=>{
                    (!activity)? Alert.alert("Oops!","You forgot to give a activity to focus on"): Start()
                }}/> 
        : <RoundButton radius={50} text={"Pause"} 
                onClick={()=>{
                    setIsstarted(false)
                    setIspaused(true)
                }}/>}
    </View>
    <View style={styles.timeButtonsContainer}>
        <RoundButton radius={20} text={"-"} onClick={onCancel}/>
    </View>
    </View>
  )
}

export default Home;