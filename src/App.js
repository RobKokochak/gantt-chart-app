import GanttChart from "./components/GanttChart";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import ProjectDetails from "./components/ProjectDetails"
import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { useState,useEffect } from "react";

const LOCAL_STORAGE_KEY = 'react-gantt-chart-tasks';

const App = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [tasks, setTasks] = useState([]);

  // recalls the tasks from local storage using the LOCAL_STORAGE_KEY
	useEffect(() => {
		const storageTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
		if (storageTasks) {
			setTasks(storageTasks);
		}
	}, []);

	// saves the tasks into local storage using the LOCAL_STORAGE_KEY
	useEffect(() => {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
		}, [tasks]);

	const addTask = task => setTasks([ task, ...tasks ]);
	
	const removeTask = id => setTasks(tasks.filter((task) => task.id !== id));

  return (
    <div className="App">
      <div className="content">
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <div className="container">
            <h1>Gantt Chart Maker</h1>
            <p>This tool allows you to generate a Gantt chart given a set of tasks, start dates, and durations. Fill out the information below to get started.</p>
              <Stack container spacing={2}>
                <ProjectDetails title={title} setTitle={setTitle} author={author} setAuthor={setAuthor}/>
                <TaskForm addTask={addTask} />
              </Stack>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="container">
              <h4>TASKS:</h4>
              <TaskList tasks={tasks} removeTask={removeTask}/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="container">
              <GanttChart title={title} author={author}/>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;