import {View,Text,StyleSheet,Image} from 'react-native';
import { Avatar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import TextLabel from '../CustomComponents/TextLabel';
export default function Profile(){
    const {t}=useTranslation();
return(
    <View style={styles.profileContainer}>
        {/* //<Image source={require('../assets/profile.png')} style={styles.image}/> */}
        <Avatar.Image size={70} source={require('../assets/profile.png')} style={styles.avatarimage}/>
    
        <View style={styles.profileText}>
            
        <Text style={styles.text} >{t("Name")} : R.Arun kumar</Text>
        <Text  style={styles.text}>{t("Role")}: Administrator</Text>
        <Text  style={styles.text}>{t("ID No")} : 1#7140**</Text>
        {/* <Text > R.Arun kumar</Text>
        <Text >1#7140**</Text>
        <Text >Admin</Text> */}

        </View>
       
    </View>
)
}
const styles=StyleSheet.create({
    profileContainer:{
        borderRadius:8,
        backgroundColor:'#F0A8D0',
        width:'100%',
        height:110,
        flexDirection:'row',
        marginLeft:10,
        marginTop:1,
    },
    image:{
        borderRadius:0,
        marginTop:50,
        marginVertical:50,
        height:50,
        width:'50%'
    },
    profileText:{
       marginTop:27,
        flexDirection:'column',
        fontSize:30,
        marginVertical:10,
    },
    avatarimage:{
        marginHorizontal:20,
        marginTop:30,
       
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        color:"#FA7070",
       // fontFamily:"Times New Roman",
        
    }
    
})