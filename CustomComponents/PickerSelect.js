import RNPickerSelect from 'react-native-picker-select';
import {StyleSheet,Platform} from 'react-native';
export default function PickerSelect({items,value,placeholder,onValueChange}){
  return(
        <RNPickerSelect
              placeholder={placeholder}
              items={items}
              value={value}
             onValueChange={onValueChange}
             style={pickerSelectStyles}
        />
  );
}
const pickerSelectStyles = StyleSheet.create({
  // inputIOS: {
  //   fontSize: 16,
  //   paddingVertical: 12,
  //   paddingHorizontal: 10,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 8,
  //   backgroundColor: '#fff',
  //   color: '#333',
  //   marginBottom: 15,
  //   marginTop: 5,
  // },
  // inputAndroid: {
  //   fontSize: 16,
  //   paddingHorizontal: 10,
  //   paddingVertical: 8,
  //  // borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 8,
  //   backgroundColor: '#fff',
  //   color: '#333',
  //   marginBottom: 15,
  //   marginTop: 5,
  // },
  inputAndroid:{
    borderWidth:1,
    backgroundColor:'#CCD5AE',
    marginTop:7,
    marginHorizontal:11,
    marginBottom:20,
  },
  placeholder: {
    color: '#888',
    fontSize: 16,
  }
});