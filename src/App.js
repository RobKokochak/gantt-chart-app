import GanttChart from "./GanttChart";
import TaskList from "./TaskList";
import UserInput from "./UserInput";
import { Grid } from "@mui/material";
import { useState } from "react";

function App() {

  const [title, setTitle] = useState('Big Ol Gantt Chart');
  const [author, setAuthor] = useState('Bert');

  return (
    <div className="App">
      <div className="content">
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <UserInput title={title} setTitle={setTitle} author={author} setAuthor={setAuthor}/>
          </Grid>
          <Grid item xs={6}>
            <TaskList />
          </Grid>
          <Grid item xs={12}>
            <GanttChart title={title} author={author}/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;