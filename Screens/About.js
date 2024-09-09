import {View,Text,StyleSheet,FlatList,ScrollView} from 'react-native';
import { DataAbout } from '../Data/AboutData';
import { FontAwesome,Ionicons, MaterialCommunityIcons, Foundation,AntDesign } from '@expo/vector-icons';
import {FontAwesome6Brands}from '@expo/vector-icons';
export default function About(){

    function renderDataAbout({item}){
        return(
            <View style={styles.contentDesign}>
             <AntDesign name='star' size={30} color={"green"}  style={styles.star}/>
            <Text style={styles.content}>{item.content}</Text>
            </View>
        )        
    }
return(
    <View>
        <Text style={styles.title}>Task Management System provides:</Text>
        <FlatList
            data={DataAbout}
            renderItem={renderDataAbout}
            keyExtractor={(item)=>item.id}
        />
        <Text style={styles.contactContainer}>Contact us</Text>

        <Text style={styles.name}>Whatsapp</Text>
        <View style={styles.contact}>
       
            <FontAwesome name='whatsapp' size={30} color={"green"} />
            <Text style={styles.info}>+917667525191</Text>
        </View>

        <Text style={styles.name}>Twitter</Text>
        <View style={styles.contact}>
       
            <FontAwesome name='twitter' size={30} color={"black"} />
            {/* <FontAwesome6Brands name='square-x-twitter' size={30} color={"black"} /> */}
            <Text style={styles.info}>rarunkumarChange</Text>
        </View>

        <Text style={styles.name}>Gmail</Text>
        <View style={styles.contact}>
       
            <AntDesign name='mail' size={30} color={"red"} />
            <Text style={styles.info}>rarunkumar@gmail.com</Text>
         </View>
         <Text style={styles.copy}><AntDesign name='copyright' size={15} color={"grey"}  style={styles.copyright}/>rarunkumar1413institue</Text>
    </View>
)
}
const styles=StyleSheet.create({
contact:{
flexDirection:'row'
},
title:{
    fontSize:20,
    marginLeft:5,
    fontWeight:'bold'
},
contactContainer:{
    padding:10,
    fontSize:16,
},
content:{
    // marginLeft:10,
    fontSize:16,
    // marginRight:7,
    marginHorizontal:5,
    padding:1,
},
info:{
    marginTop:3,
    justifyContent:"center",
    alignContent:"center",
    marginLeft:20,
    fontSize:15
},
name:{
    marginLeft:5,
    fontSize:20,
},
contact:{
    marginLeft:10,
    flexDirection:'row'
},
contentDesign:{
    flexDirection:"row",
    marginTop:10,
    marginRight:1
},
star:{
    marginLeft:3,
color:'#B60071'
},
copy:{
    marginTop:8,
    color:'grey'
}
});