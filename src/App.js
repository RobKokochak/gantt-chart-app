import GanttChart from "./GanttChart";
import TaskList from "./TaskList";
import UserInput from "./UserInput";
import { Grid } from "@mui/material";

function App() {
  return (
    <div className="App">
      <div className="content">
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <UserInput />
          </Grid>
          <Grid item xs={6}>
            <TaskList />
          </Grid>
          <Grid item xs={12}>
            <GanttChart />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;