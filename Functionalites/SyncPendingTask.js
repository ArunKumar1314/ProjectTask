import { fetchTaskFromDb, updateTaskFromDb ,updateOfflineToOnlineDb} from '../store/database';
import { postTask,getTask,deleteTaskFromAPI, updateTaskFromAPI} from '../store/api';

export const addOfflineToOnline = async () => {
  try {
    const tasks = await fetchTaskFromDb();
    const pendingTasks = tasks.filter(task => task.dataSynced === 'pending');
     for (const task of pendingTasks) {
      const taskData = {
        title: task.title,
        description: task.description,
        completion_status: task.completion_status,
        risk_status: task.risk_status,
        dateAssigned: task.dateAssigned,
        deadLine:task.deadLine,
        signature: task.signature
      };
      console.log("id"+task.id);
      const apiId = await postTask(taskData);
      await updateOfflineToOnlineDb(apiId,task.id);
    }
    } catch (error) {
        console.error('Failed to fetch or synchronize tasks:', error);
      }
    };
  
export const deleteOfflineToOnline=async()=>{
    try{
        const apiTasks = await getTask();
        const tasks = await fetchTaskFromDb();
        console.log("d"+tasks)
        const dbTaskIds = new Set(tasks.map(task => task.id));
        const tasksToDeleteFromApi = apiTasks.filter(task => !dbTaskIds.has(task.id));   
 for (const task of tasksToDeleteFromApi) {
   try {
      deleteTaskFromAPI (task.id);
     console.log('Deleted task from API:', task.id);
   } catch (error) {
     console.error('Failed to delete task from API:', task.id, error);
   }
}
} catch (error) {
 console.error('Failed to fetch or synchronize tasks2:', error);
}
};

export const updateOfflineToOnline = async () => {
    try {
      const [dbTasks, apiTasks] = await Promise.all([fetchTaskFromDb(), getTask()]);
      const apiTasksMap = new Map(apiTasks.map(task => [task.id, task]));
      for (const task of dbTasks) {
        const apiTask = apiTasksMap.get(task.id);
        if (apiTask) {
          const needsUpdate = 
            task.title !== apiTask.title ||
            task.description !== apiTask.description ||
            task.completion_status !== apiTask.completion_status ||
            task.risk_status !== apiTask.risk_status ||
            task.dateAssigned !== apiTask.dateAssigned ||
            task.deadLine !== apiTask.deadLine ||
            task.signature !== apiTask.signature;
            //task.dataSynced==="to update";
          if (needsUpdate) {
            const taskData = {
              title: task.title,
              description: task.description,
              completion_status: task.completion_status,
              risk_status: task.risk_status,
              dateAssigned: task.dateAssigned,
              deadLine:task.deadLine,
              signature: task.signature
            };
            try {
              await updateTaskFromAPI(task.id, taskData);
              await updateTaskFromDb(
                task.id,
                task.title,
                task.description,
                task.completion_status,
                task.risk_status,
                task.dateAssigned,
                task.deadLine,
                task.signature,
                'completed'
              );
              console.log(`Updated task ${task.id} successfully`);
            } catch (error) {
              console.error(`Failed to update task ${task.id}:`, error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch or synchronize tasks1:', error);
    }
  };
  



