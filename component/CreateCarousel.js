import react,{useState,useRef} from "react";
import { FlatList,Animated,View,StyleSheet} from "react-native";
import {Slides} from '../Data/Carousel';
import CarouselItem from './CarouselItem';
import Paginator from "./Paginator";

export default function  CreateCarousel(){
    const scrollX=useRef(new Animated.Value(0)).current;
    const slidesRef=useRef(null);
    const [currentIndex,setCurrentIndex]=useState(0);
    const viewableItemChanged=useRef(({viewableItems})=>{
        setCurrentIndex(viewableItems[0].index)
    }).current;
    const viewConfig=useRef({viewAreaCoveragePercentThreshold:50}).current;
return(
    <View style={Styles.cont}>
        <View style={{flex:3}}>
         <FlatList
    data={Slides}
    renderItem={({item})=> <CarouselItem item={item} />}
     keyExtractor={(item)=>item.id}
     horizontal
     showsHorizontalScrollIndicator
     pagingEnabled
     bounces={false}
     onScroll={Animated.event([{nativeEvent:{contentOffset:{x:scrollX}}}],
       { useNativeDriver:false}
     )}
     onViewableItemsChanged={viewableItemChanged}
     viewabilityConfig={viewConfig}
     ref={slidesRef}
    />
   </View>
   <Paginator data={Slides} scrollX={scrollX}/>
    </View>
)
};
const Styles=StyleSheet.create({
   cont:{
    flex:1,
   } 
});