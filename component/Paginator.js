import react from "react";
import {View,Text,StyleSheet,Animated,useWindowDimensions} from 'react-native';
import { Extrapolate } from "react-native-reanimated";
export default function Paginator({data,scrollX}){
    const {width}=useWindowDimensions();
    return(
        <View style={{flexDirection:'row',height:64}}>
            {data.map((_,i)=>{
                const inputRange=[(i-1)*width,i*width,(i+1)*width];
                const dotWidth=scrollX.interpolate(
                    {
                        inputRange,
                        outputRange:[10,20,10],
                        Extrapolate:"clamp"
                    }
                );
                return <Animated.View style={[Styles.dot,{width:dotWidth}]} key={i.toString()}/>;
            })}
        </View>
    )
}
const Styles=StyleSheet.create({
    dot:{
height:10,
backgroundColor:"black",
marginHorizontal:5,
borderRadius:5,
marginLeft:20,
    }
})