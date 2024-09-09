import axios from "axios";

const URL='https://taskdata-10974-default-rtdb.firebaseio.com/';


 export async function  postTask(taskData){
   console.log("posted");
    const response=await axios.post(URL+'Tasks.json',taskData);
    id=response.data.name;
    return id;
 };
 export async function getTask(){

    const response=await axios.get(URL+'Tasks.json')
    const taskList=[];
  
    console.log(response.data);
    for( const key in response.data){
        const taskObj={
            id:key,
            title:response.data[key].title,
            description:response.data[key].description,
            completion_status:response.data[key].completion_status,
            risk_status:response.data[key].risk_status,
            dateAssigned:response.data[key].dateAssigned,
            deadLine:response.data[key].deadLine,
        };
        taskList.push(taskObj); 
     
    }
    return taskList;
 }

 export function updateTaskFromAPI(id,taskData){
    return axios.put(URL+`Tasks/${id}.json`,taskData);
 }

 export function  deleteTaskFromAPI (id){
    axios.delete(URL+`Tasks/${id}.json`);
 }
 
 
 