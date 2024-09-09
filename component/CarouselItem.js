import react from "react";
import { FlatList,Image,StyleSheet,View,Text } from "react-native";
import {Slides} from '../Data/Carousel';
export default function  CarouselItem({item}){
return(
   <View style={Styles.container}>
    <Image source={item.image} style={Styles.image}/>
    <View style={{flex:0.3}}>
        <Text>{item.content}</Text>
    </View>
   </View>
)
};
const Styles=StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        flex:0.7
    }
})