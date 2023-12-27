import About from './components/About'
import Gantt from './components/Gantt';
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import ProjectDetails from "./components/ProjectDetails"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = 'react-gantt-chart-tasks';

const darkTheme = createTheme({
  palette: {
      mode: 'dark',
  }
});

const App = () => {
  const [title, setTitle] = useState('Project Title');
  const [author, setAuthor] = useState('Author');
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

  const removeAllTasks = () => setTasks([]);

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
      <div className="content">
        <Grid className="whole-grid" container direction='row' spacing={1} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <div className="container" id="project-details-container">
            <h1>Gantt Chart Tool</h1>
            <p>This tool allows you to generate a Gantt chart given a set of tasks, start dates, and durations. Fill out the information below to get started.</p>
              <Stack container="true" spacing={1.5}>
                <ProjectDetails title={title} setTitle={setTitle} author={author} setAuthor={setAuthor}/>
                <TaskForm addTask={addTask} />
              </Stack>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="container">
              <h4>TASKS: {tasks.length}</h4>
              <TaskList tasks={tasks} removeTask={removeTask} removeAllTasks={removeAllTasks}/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="gantt-container">
              <h1>Gantt Chart:</h1>
              <Gantt tasks={tasks} title={title} author={author}/>
            </div>
          </Grid>
        </Grid>
        <div className="credits">
          <About/>
        </div>
      </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
