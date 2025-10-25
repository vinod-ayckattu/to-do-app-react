import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { useForm } from "react-hook-form";

function Index({fromHome}) {
  const [tasks, setTasks] = useState([]);
  const [name, setName ] = useState('');
  const [desc, setDesc ] = useState('');
  const [scheduled_date, setSheduledDate ] = useState('');
  const [duration, setDuration ] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(search);
    }, 500);
});

  const fetchTasks = async () => {
     try {
        const response = await fetch("http://127.0.0.1:8000/api/get-tasks");
        const result = await response.json();
        setTasks(result.tasks ?? []); // adjust based on your API response shape
       
      } catch (error) {
        console.error("Error fetching Tasks:", error);
      }
  };
  
  const handleStoreTask = async () => {
    const data = { name, desc, scheduled_date, duration };

    try{
    const response = await fetch("http://127.0.0.1:8000/api/add-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    //console.log(result);
     } catch (error) {
    console.error("Error fetching user:", error);
  }
  };

  const handleEdit = (task) => { 
    setName(task.task_name);
    setDesc(task.task_desc);
    setSheduledDate(task.scheduled_date);
    setDuration(task.duration);
  };
    const filteredTasks = tasks.filter(task =>
        task.task_name.toLowerCase().includes(debouncedTerm.toLowerCase())
      );
    //  console.log(filteredTasks);
  
  return (
    <>
    <div>
      
  <div className='row'>
        <div className='col'>
          <div className='card'>
            <div className='card-header'><h2>Add New Task</h2></div>
            <div className='card-body'>
              <input type="text" placeholder="Task Name" className='form-control mb-2' value={name} onChange={(e) => setName(e.target.value)}/>
              <input type="text" placeholder="Task Description" className='form-control mb-2' value={desc}  onChange={(e) => setDesc(e.target.value)}/>
              <input type="date" placeholder="Scheduled On" className='form-control mb-2' value={scheduled_date}  onChange={(e) => setSheduledDate(e.target.value)}/>
              <input type="number" placeholder="Duration (Minutes)" className='form-control mb-2' value={duration}  onChange={(e) => setDuration(e.target.value)}/>
              <button className="btn btn-primary" onClick={handleStoreTask}>Store Task</button>
            </div>
          </div>
        </div>
        <div className='col'>
          {fromHome}
          <input type='text' className='form-control w-100' placeholder='Search..' value={search} onChange={(e) => setSearch(e.target.value)}/>
          <div className='d-flex flex-wrap justify-content-start text-left'>
            {filteredTasks.map((task) => 
            <div key={task.id} className='card mx-2 my-2'>
              <div className='card-header'><h3>{task.task_name}</h3></div>
              <div className='card-body'>
                <p>{task.task_desc}</p>
                <p>{task.scheduled_date}</p>
                <p>{task.duration} minutes</p>
                <button onClick={() => handleEdit(task)}>Duplicate Task</button>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default Index
