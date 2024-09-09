import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React,{useState} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
export default function DatePicker({date,onConfirmDate}){
const [visible,setVisible]=useState(false);

  function hideDatePicker(){
    setVisible(false);
  }
  function handleConfirm(date){
    onConfirmDate(date);
   hideDatePicker();
  }
  function showDatePicker(){
    setVisible(true);
  }
  return(
    <View style={styles.but}>
    {/* <Button title="Pick Date" onPress={showDatePicker} /> */}
    <Button  icon="calendar-text"  mode="contained" onPress={showDatePicker}>
      Pick Date
    </Button>
      <DateTimePickerModal
        mode="date"
        date={date}
        isVisible={visible}
        onConfirm={handleConfirm}
        onCancel={()=>hideDatePicker()}
        
      />
    
      </View>
  );
}
const styles=StyleSheet.create({
but:{
  marginBottom:10,
  marginTop:5,
  //marginHorizontal:120
}
});