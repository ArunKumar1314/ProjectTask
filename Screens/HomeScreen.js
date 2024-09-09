import React, {useState} from 'react';
import {SafeAreaView,StyleSheet,Image,Text,TouchableOpacity,Modal,View,FlatList,Dimensions,ScrollView,
} from 'react-native';
import i18next, {languageResources} from '../services/i18next';
import {useTranslation} from 'react-i18next';
import languagesList from '../services/languagelist.json';
import Profile from '../component/Profile';

const HomeScreen= () => {
  const [visible, setVisible] = useState(false);
  const {t} = useTranslation();

  function changeLng(lng) {
    i18next.changeLanguage(lng);
    setVisible(false);
  };
  return (
   
    <SafeAreaView style={styles.container}>
       <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.profileFixing}>
      <Profile/>
      <Image
      source={require("../assets/homePage.jpg")}
      style={styles.image1}
      />
      </View>
      <Modal visible={visible} onRequestClose={() => setVisible(false)}>
        
        <View  style={styles.modalStyle}>
          <View style={styles.modelContent}>
            <Text style={styles.meg}>Choose Custom Language to Visit</Text>
          <FlatList
            data={Object.keys(languageResources)}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.langButton}               
                onPress={() => changeLng(item)}>
                <Text style={styles.lngName}>
                  {languagesList[item].nativeName}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        </View>
      </Modal>  
      
      <View style={styles.lngcontent}>
        <Text style={styles.content}>{t('project')}</Text>
          <TouchableOpacity  onPress={() => setVisible(true)}>
            <Text style={styles.changeBut}>{t('change-language')}</Text>
          </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
// const windowWidth=Dimensions.get("window").width;
// console.log("h"+windowWidth);
// const windowHeight=Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
  flex:1,
   backgroundColor:'white'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  lngName: {
    marginTop:20,
    marginLeft:80,
    fontSize: 25,
    borderRadius:8,
    alignItems:"center",
    color: '#A0153E',
    height:60,
  },
  changeBut:{
    marginTop:40,
//width:windowWidth >600 ?00:100, 
    height:'30',
    backgroundColor:'#78A083',
   // borderWidth:1,
    borderRadius:7,
    fontSize:20,
    alignContent:'center',
    justifyContent:'center',
    marginLeft:5,
    
  },
  modalStyle:{
   marginTop:380,
   marginLeft:50,
    backgroundColor:'#CEDF9F',
    width:'80%',
    maxHeight:200,
     alignItems:'center',
    borderRadius:8,
    alignContent:"center",
    justifyContent:"center"
  },
  content:{
    color:'blue'
  },
  langButton:{
    borderWidth:1,
    borderRadius:7,
    width:'100%',
    height:50,
    marginTop:10,
    justifyContent:'center',
    alignContent:'center',
  
  },
  lngcontent:{
    marginTop:50,
    alignItems:'center',
  },
  profileFixing:{
    alignItems:'center',
    padding:20,
  },
  modelContent:{
    justifyContent:'center',
    alignContent:'center',
    marginTop:20
  },
  meg:{
    fontSize:20,
    color:'red'
  },
  image1:{
    marginTop:50,
    width:'120%',
    height:250,
  }
});

export default HomeScreen;