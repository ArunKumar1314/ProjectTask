import React, {useState} from 'react';
import {SafeAreaView,StyleSheet,Image,Text,View,Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../CustomComponents/Input';
import {Card, HelperText} from 'react-native-paper'
import HomeScreen from './HomeScreen';
import CreateCarousel from '../component/CreateCarousel';
const LoginScreen= () => {
  const navigation=useNavigation();

  const [inputs,setInputs]=useState({
    username:{
      value:'',
      isValid:true,
      errorMsg:''
    },
    password:{
      value:'',
      isValid:true,
      errorMsg:''
    },
  });

  const handleInputs=(field,value)=>{
    setInputs(currentVal=>({
      ...currentVal,
      [field]:{value,isValid:true,errorMsg:''}
  }))
  }
  return(
<View style={Styles.container}>
  <Text>Welcome to Login Screen</Text>
  <CreateCarousel/>
  <Card >
    <Card.Content>
     <Input
     label="Username"
     placeholder="username or mail"
     value={inputs.username.value}
     onChangeText={(value)=>handleInputs('username',value)}
     />
     <HelperText type="error" visible={!inputs.username.isValid}>
      {inputs.username.errorMsg}
     </HelperText>
      <Input
            label="Password"
            placeholder="password"
            value={inputs.password.value}
            onChangeText={(value)=>handleInputs('password',value)}
     />
       <HelperText type="error" visible={!inputs.password.isValid}>
       {inputs.password.errorMsg}
       </HelperText>
    </Card.Content>

  </Card>
  <Button
  title="Tab To Visit"
  onPress={()=>{ navigation.navigate('Welcome')}}
  />
</View>
  )
};
export default LoginScreen;
const Styles=StyleSheet.create({
  container:{
flex:1,
  }
})