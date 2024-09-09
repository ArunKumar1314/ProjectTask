import { useState, useEffect } from 'react';
import React from 'react';
const TaskFilter = ({ tasks, searchText }) => {
    const filteredData = searchText
        ? tasks.filter(task => task.title.toLowerCase().includes(searchText.toLowerCase()))
        : tasks;
    return filteredData;
};
export default TaskFilter;
