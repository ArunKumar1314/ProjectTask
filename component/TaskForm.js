import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, KeyboardAvoidingView, Platform, Modal, Image ,ScrollView,ImageBackground} from 'react-native';
import { CreateNotification } from '../CustomComponents/CreateNotification';
import { useRoute, useNavigation } from '@react-navigation/native';
import { addTaskToDb, updateTaskFromDb } from '../store/database';
import PickerSelect from '../CustomComponents/PickerSelect';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import IdGeneration from '../Functionalites/IdGeneration';
import { postTask, updateTaskFromAPI } from '../store/api';
import DatePicker from '../CustomComponents/DatePicker';
import { NetworkContext } from '../store/NetworkContext';
import Signature from "react-native-signature-canvas";
import Notification from '../Screens/Notification';
import { taskContext } from '../store/Context';
import Input from '../CustomComponents/Input';
import { useTranslation } from 'react-i18next';
import { HelperText } from 'react-native-paper';

export default function TaskForm() {
  const route = useRoute();
  const { label } = route.params || {};
  const { extractedValues } = route.params || {};
  const id = extractedValues ? extractedValues.id : null;
  const { addTask, updateTask, tasks } = useContext(taskContext);
  const navigation = useNavigation();
  const {isOnline}=useContext(NetworkContext);
  const {t}=useTranslation();
  const [inputs, setInputs] = useState({
    title: {
      value: extractedValues ? extractedValues.title : '',
      isValid: false,
      errorMsg:''
    },
    description: {
      value: extractedValues ? extractedValues.description : '',
      isValid: true
    },
    signature: {
      value: extractedValues ? extractedValues.signature : '',
      isValid: true
    },
    completion_status: {
      value: extractedValues ? extractedValues.completion_status : '',
      isValid: true
    },
    dateAssigned: extractedValues ? new Date(extractedValues.dateAssigned) : new Date(),
    deadLine:extractedValues?new Date(extractedValues.deadLine) :new Date(),
    risk_status: extractedValues ? extractedValues.risk_status : '',
  });
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signature, setSignature] = useState(inputs.signature.value); 

  useEffect(() => {
    if (extractedValues) {
      setInputs({
        title: {value: extractedValues.title,isValid: true},
        description: { value: extractedValues.description,isValid: true},
        completion_status: { value: extractedValues.completion_status,isValid: true },
        signature: { value: extractedValues.signature, isValid: true,},
        dateAssigned: new Date(extractedValues.dateAssigned),
        deadLine:new Date(extractedValues.deadLine),
        risk_status: extractedValues.risk_status || '',
      });
      setSignature(extractedValues.signature || ''); 
    }
  }, [extractedValues]);

  const handleSignature = (signature) => {
    setSignature(signature);
    setShowSignatureModal(false);
  };
  const validate = () => {
    let isValid = true;
  
    if (inputs.title.value.trim().length < 5) {
      setInputs(prev => ({
        ...prev,
        title: { value: inputs.title.value, isValid: false, errorMsg: 'Title is required and should be at least 2 characters long.' }
      }));
      isValid = false;
    } else {
      setInputs(prev => ({
        ...prev,
        title: { value: inputs.title.value, isValid: true, errorMsg: '' }
      }));
    }
    return isValid;
  };

  const handleInputChange=(field,value)=>{
    setInputs(currentVal=>({
      ...currentVal,
      [field]:{value,isValid:true}
    }))
  }
  const formSubmissionHandler = async () => {
    if(!validate()){
      return ;
    }
    const taskData = {
      title: inputs.title.value,
      description: inputs.description.value,
      completion_status: inputs.completion_status.value,
      risk_status: inputs.risk_status,
      dateAssigned: inputs.dateAssigned.toISOString(),
      deadLine:inputs.deadLine.toISOString(),
      signature: signature
    }
    if (label === 'Edit') {
        if(isOnline==='Online'){
            updateTaskFromAPI (id,taskData);
            updateTask(id, taskData);
            updateTaskFromDb(id, 
              taskData.title,taskData.description,taskData.completion_status,taskData.risk_status,taskData.dateAssigned,  taskData.deadLine,taskData.signature
            );
        }
     else{
        updateTaskFromDb(id, 
            taskData.title,taskData.description, taskData.completion_status,taskData.risk_status, taskData.dateAssigned, taskData.deadLine, taskData.signature,  "to update"
          );
      updateTask(id, taskData);
      }
    } 
    if(label==='Add'){
        if(isOnline==='Online'){
            const apiId=await postTask(taskData);
           addTaskToDb(
            apiId, taskData.title,taskData.description, taskData.completion_status, taskData.risk_status,taskData.dateAssigned,taskData.deadLine,taskData.signature, "completed");
          await CreateNotification(taskData.title,taskData.dateAssigned)      
          console.log(taskData.title);
          <Notification
            title={taskData.title}
            dateAssigned={taskData}
          />
          addTask({ ...taskData, id: apiId });
        }
      else{
        const offlineId=IdGeneration();
        addTaskToDb(
          offlineId,taskData.title,taskData.description,taskData.completion_status, taskData.risk_status, taskData.dateAssigned,taskData.deadLine, taskData.signature,"pending");
          addTask({ ...taskData, id: offlineId });
          await CreateNotification(taskData.title,taskData.dateAssigned)
       }
    }
    setInputs({
      title: { value: '', isValid: true },
      description: { value: '', isValid: true },
      completion_status: { value: '', isValid: true },
      risk_status: '',
      dateAssigned: new Date(),
      deadLine:new Date(),
      signature: { value: '', isValid: true },
    });
    setSignature('');
    //navigation.goBack();
    navigation.navigate('ManageTasks')
  };
  const riskStatusOptions = [
        { label: t('riskStatus.low'), value: 'Low' },
        { label:  t('riskStatus.medium'), value: 'Medium' },
        { label:  t('riskStatus.high') ,value: 'High' }
      ];
  return (
    <ScrollView  style={styles.container}>
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.container}
    >
      <View style={styles.container}>
        <Text style={styles.formLabel}>{label} {t('Task')}</Text>
        <Input
          label={t("title")}
          value={inputs.title.value}
        //  onChangeText={(value) => setInputs(currentVal => ({ ...currentVal, title: { value, isValid: true } }))}
          onChangeText={(value)=>handleInputChange('title',value)}
          //iconName="eye"
        />
        <HelperText type="error" visible={!inputs.title.isValid}>
            {inputs.title.errorMsg}
        </HelperText>
        <Input
          label={t("Description")}
          value={inputs.description.value}
         // onChangeText={(value) => setInputs(currentVal => ({ ...currentVal, description: { value, isValid: true } }))}
          onChangeText={(value)=>handleInputChange('description',value)}
          multiline={true}
          numberOfLines={3}
        />
        <Input
          label={t("Completion Status")}
          value={inputs.completion_status.value}
        // onChangeText={(value) => setInputs(currentVal => ({ ...currentVal, completion_status: { value, isValid: true } }))}
         onChangeText={(value)=>handleInputChange('completion_status',value)}
        />
        <PickerSelect
          placeholder={{ label: t('Select Risk Status'), value: null }}
          onValueChange={(value) => setInputs(currentVal => ({ ...currentVal, risk_status: value }))}
          items={riskStatusOptions}
          value={inputs.risk_status}
          style={styles.dropdown}
        />
        <View style={styles.datePicking}>
            <Text style={styles.datePicker}>{t('Date Assigned')}: {inputs.dateAssigned.toDateString()}</Text>
            <DatePicker
          date={inputs.dateAssigned}
          onConfirmDate={(date) => setInputs(prev => ({ ...prev, dateAssigned: date }))}
        />
        </View>
       <View style={styles.datePicking}>
           <Text style={styles.datePicker}>{t("DeadLine date")}: {inputs.deadLine.toDateString()}</Text>
           <DatePicker
          date={inputs.deadLine}
          onConfirmDate={(date) => setInputs(prev => ({ ...prev, deadLine: date }))}
        />
       </View>
        {signature ? (
          <Image
            source={{ uri: signature }}
            style={styles.signatureImage}
          />
        ) : (
          <Text style={{marginLeft:15,fontSize:15}}>{t('No signature')} <FontAwesome5 name="file-signature" size={20} color={"pink"}/></Text>
        )}
        <View style={styles.buttons}>
        <Button
          title={t("Sign")}
          onPress={() => setShowSignatureModal(true)}
          />
        </View>
        <View style={styles.buttons}>
        <Button
          title={t("Submit")}
          onPress={formSubmissionHandler}
          disabled={!inputs.title.isValid || !inputs.description.isValid || !inputs.completion_status.isValid}
          style={styles.but}
        />
        </View>
      </View>
      <Modal
        visible={showSignatureModal}
        transparent={true}
        onRequestClose={() => setShowSignatureModal(false)}
      >
        <Signature onOK={handleSignature} onEmpty={() => console.log("Signature is empty")} />
      </Modal>
    </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#EB5B00',
  },
  input: {
    marginBottom:10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderColor:'black'
  },
  formLabel: {
    marginTop:50,
    fontSize: 20,
    color: '#F9E400',
    justifyContent: "center",
    alignContent: 'center',
    marginHorizontal: 150,
  },
  datePicker: {
    fontSize: 13,
    fontWeight: "bold",
    opacity:0.55,
    marginHorizontal:10,
    marginTop:10,
    color:'white'
  },
  but: {
    marginTop: 30,
    borderRadius:8,
  },
  signatureImage: {
    width: 335,
    height: 114,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  dropdown:{
    fontSize:15,
    padding:10,
    marginHorizontal:10,
  },
  backgroundImage:{
    flex:2,
    height:700,
    width:'100%',
  },
  datePicking:{
    flexDirection:'row',
  },
  buttons:{
    marginHorizontal:20,
    marginBottom:10,
    color:"#FF4191",
    backgroundColor:"#FF4191",
    borderRadius:5,
  }
});


