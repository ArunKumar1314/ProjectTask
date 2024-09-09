import React, { useContext ,useState,useEffect} from 'react';
import { View, Text, StyleSheet, Pressable,Alert} from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { taskContext } from '../store/Context';
import { useNavigation } from '@react-navigation/native';
import TextLabel from '../CustomComponents/TextLabel';
import formatDate from '../Functionalites/FormatDate';
import { deleteTaskFromAPI } from '../store/api';
import { deleteAllTasks, deleteTaskFromDb } from '../store/database';
import{deleteOfflineToOnline} from '../Functionalites/SyncPendingTask';
import { NetworkContext } from '../store/NetworkContext';
import { useTranslation } from 'react-i18next';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function CardComponent({ id, title, description, risk_status, dateAssigned, deadLine, completion_status, onPress }) {
  const navigation = useNavigation();
  const {t}=useTranslation();
  const { deleteTask, tasks, updateTask } = useContext(taskContext);
  
  const{isOnline}=useContext(NetworkContext);
  useEffect(() => {
    const checkDeadline = async () => {
      if (new Date(deadLine).toDateString() === new Date().toDateString()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Reminder',
            body: `${title} reached its deadline period ${new Date(deadLine).toDateString()}`,
          },
          trigger: {
            seconds: 1,
          },
        });
      }
    };
  
    checkDeadline();
  }, [deadLine, title]);
  

  const deleteOnOk=()=>{
    deleteTaskFromAPI(id);
    deleteTask(id);
    deleteTaskFromDb(id);
  }
  async function deleteHandler() {
 
 if(isOnline=='Online'){
  console.log("id for delete"+id);
  Alert.alert(
    "Deleting selected Item",
    "Are you sure about deleting this item",
    [ {
        text:'OK',
        onPress:()=>deleteOnOk()
      },
     {
      text:'Cancel',
      style:'cancel'
     }]
  );
 }
 else{
  console.log("delete from offline to online")
  deleteTaskFromDb(id)
  deleteTask(id);
 }
  }

  function updateHandler() {
    const extractedValues = tasks.find(task => task.id === id);
    navigation.navigate('TaskForm', {
      extractedValues,
      label:"Edit",
    });
  }
  return (
    <Pressable>
      <Card style={styles.card}>
        <Card.Content style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <TextLabel label={t("title")} value={title} />
            <TextLabel label={t("Description")} value={description} />
            <TextLabel label={t("Risk Status")} value={risk_status} />
            <TextLabel label={t("Completion Status")} value={completion_status} />
            <TextLabel label={t("Date Assigned")} value={formatDate(dateAssigned)} />
            <TextLabel label={t("DeadLine Date")} value={formatDate(deadLine)} />
         
            </View>
          
          <View style={styles.actions}>
            <AntDesign name="form" size={24} color="#C40C0C" onPress={updateHandler} style={styles.icons} />
            <AntDesign name="delete" size={24} color="#C40C0C" onPress={deleteHandler} style={styles.icons} />
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '95%',
    margin: 10,
    backgroundColor: '#FF9100',
    borderRadius: 8,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginHorizontal:10,
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  icons: {
    marginLeft: 20,
  },
});



