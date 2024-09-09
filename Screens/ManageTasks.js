import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import CardComponent from '../component/CardComponent';
import TaskFilter from '../Functionalites/TaskFilter';
import { useNavigation } from '@react-navigation/native';
import { taskContext} from '../store/Context';
import { Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import {getTask,taskList} from '../store/api';
import { fetchTaskFromDb } from '../store/database';
import { NetworkContext } from '../store/NetworkContext';
import TaskForm from '../component/TaskForm';
import HomeScreen from './HomeScreen';
import { useTranslation } from 'react-i18next';
import { addOfflineToOnline,updateOfflineToOnline ,deleteOfflineToOnline} from '../Functionalites/SyncPendingTask';
import Loading from '../CustomComponents/Loading';


export default function ManageTasks() {
    const {setTasks,tasks } = useContext(taskContext);
    const{isOnline}=useContext(NetworkContext);
    const [searchText, setSearchText] = useState("");
    const navigation = useNavigation();
    const {t}=useTranslation();

    useEffect(() => {
      async function getData(){
       
        let data = [];
        try{
            if(isOnline==='Online'){
                console.log("Network status: Online");
                addOfflineToOnline();
                deleteOfflineToOnline(); 
                updateOfflineToOnline();
                data=await getTask();
                console.log("fetched online"+data)
            }
            else{
                console.log("Network status: Offline");
                data=await fetchTaskFromDb();
                console.log("fetched offline"+data)
                for(i=0;i<data.length;i++){
                    //console.log(data);
                }
            }
            setTasks(data);
            
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}
if (isOnline !== null) {
    getData();
}
    }, [isOnline]);


    function handleNewTask () {
        try{
            navigation.navigate('TaskForm',{label:"Add"});
        }catch(error){
                console.log("something error",error)
        }
      
        // return(
        //     <TaskForm
        //     label={"Add"}
        //     />
        // );
       
    }

      const filteredData = TaskFilter({ tasks, searchText });
      
    const renderTaskItem = ({ item }) => {
     
        return (
        
            <CardComponent
                id={item.id}
                title={item.title}
                dateAssigned={item.dateAssigned}
                deadLine={item.deadLine}
                description={item.description}
                risk_status={item.risk_status}
                completion_status={item.completion_status}
            />
           
        );
    };
   
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.createTask} onPress={handleNewTask}>
                <Ionicons name="add" size={24} color="black" />
                <Text style={styles.createText}>{t("New Task")}</Text>
            </TouchableOpacity>

            <View style={styles.searchBar}>
                <Searchbar
                    placeholder={t("Search by Task title")}
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
           {/* // <Loading/> */}
       {filteredData.length ===0 ? <Text style={styles.taskinfo}>No task founded</Text> 
           :( 
  
            <FlatList
                data={filteredData}
                renderItem={renderTaskItem}
                keyExtractor={(item) => item.id}
            />
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: '#FFEFEF',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    createTask: {
        marginTop: 5,
        marginHorizontal: 10,
        borderRadius: 8,
        height: 30,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    createText: {
        fontSize: 20,
        color: 'black',
        marginLeft: 8,
    },
    container: {
        backgroundColor: 'blue',
        flex: 1,
    },
    taskinfo:{
      fontSize:20,
      justifyContent:'center',
      alignContent:'center',
      color:'red',
      marginLeft:100,
      marginTop:50,
    }
});


