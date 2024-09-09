import React, { createContext, useReducer } from 'react';
const taskContext=createContext({
    tasks:[],
    addTask:(taskdata)=>{},
    setTasks:(Tasks)=>{},
    updateTask:(id,taskdata)=>{},
    deleteTask:(id)=>{}
});
function tasksReducerFun(state, action) {
  switch (action.type) {
    case 'ADD': {
      return [{...action.payload},...state];
    }
    case 'SET':
      {
        const orderOfSetting=action.payload.reverse();
        return orderOfSetting;
      }
    case 'UPDATE': {
      const updatingId = state.findIndex(task => task.id === action.payload.id);
      if (updatingId === -1) return state;
      const updatedtask = [...state];
      updatedtask[updatingId] = { ...updatedtask[updatingId], ...action.payload.data };
      return updatedtask;
    }
    case 'DELETE': {
      return state.filter(task => task.id !== action.payload);
    }
    default:
      return state;
  }
}


export function TaskProvider({ children }) {
  const [tasksState, dispatch] = useReducer(tasksReducerFun,[]);

  function addTask(tasksData) { 
    dispatch({ type: 'ADD', payload: tasksData });
  }


  function setTasks(Tasks) {
    dispatch({ type: 'SET', payload: Tasks });
  }


  function updateTask(id, tasksData) {
    dispatch({ type: 'UPDATE', payload: { id, data: tasksData } });
  }

  function deleteTask(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  const contextValue={
    tasks:tasksState,
    addTask,
    setTasks,
    updateTask,
    deleteTask
  }
return(
    <taskContext.Provider value={contextValue}>{children}</taskContext.Provider>
);
  
}
export {taskContext};