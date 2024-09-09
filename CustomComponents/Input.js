import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';
export default function Input({label,iconName,onChangeText,value,multiline = false,numberOfLines=1}){
  return(
         <TextInput
                  mode="outlined"
                  label={label}
                  value={value}
                  onChangeText={onChangeText}
                  multiline={multiline}
                  numberOfLines={numberOfLines}
                  right={<TextInput.Icon icon={iconName} />}
                  style={styles.inputStyle}
  />
  );
 
}
const styles=StyleSheet.create({
  inputStyle:{
    marginHorizontal:10,
    fontSize:20,
    borderColor:'black',
    //backgroundColor:'#A6B37D',
    borderRadius:8,
    marginBottom:5,
    opacity:0.55
  }
});