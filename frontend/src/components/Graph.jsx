import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2'; 
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import useTasks from '../hooks/useTasks';


// Registering the chart components
ChartJS.register(ArcElement, Title, Tooltip, Legend);
const Graph = () => {

    const{
        tasks
    }=useTasks()

    const [statusStats, setStatusStats] = useState([]);
    const [priorityStats, setPriorityStats] = useState([]);
  
    const fetchTaskStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks/task-stats');
        setStatusStats(response.data.statusCount);
        setPriorityStats(response.data.priorityCount);
      } catch (err) {
        console.error(err);
      }
    };
  
    useEffect(() => {
      fetchTaskStats();
    }, [tasks]);
  
    const statusData = {
      labels: statusStats.map((status) => status._id),
      datasets: [
        {
          label: 'Tasks by Status',
          data: statusStats.map((status) => status.count),
          backgroundColor: ['#ff6384', '#36a2eb', '#4bc0c0'], // Colors for different status
          borderColor: ['#ff6384', '#36a2eb', '#4bc0c0'],
          borderWidth: 1,
        },
      ],
    };
  
    const priorityData = {
      labels: priorityStats.map((priority) => priority._id),
      datasets: [
        {
          label: 'Tasks by Priority',
          data: priorityStats.map((priority) => priority.count),
          backgroundColor: ['#ff9f40', '#ffcd56', '#4bc0c0'], // Colors for different priority levels
          borderColor: ['#ff9f40', '#ffcd56', '#4bc0c0'],
          borderWidth: 1,
        },
      ],
    };
  

  return (
    <>
       <div className="flex gap-2 w-[50vw] mt-[5vh]">
          <div className="flex flex-col items-center" style={{ height: '250px', width: '50%' }}>
            <Pie data={statusData} />
            {statusStats.length > 0 && <h2>Status Distribution</h2>}
          </div>
          <div className="flex flex-col items-center" style={{ height: '250px', width: '50%' }}>
            <Pie data={priorityData} />
            {priorityStats.length > 0 && <h2>Priority Distribution</h2>}
          </div>
        </div>
    </>
  )
}

export default Graph
