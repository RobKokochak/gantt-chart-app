import { Button, Grid, TextField } from "@mui/material";

const UserInput = () => {
  return ( 
    <div className="user-input">
      <h1>Gantt Chart Tool</h1>
      <p>This tool allows you to generate a Gantt chart given a set of task, start dates, and durations, Fill out the information below to get started.</p>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="title-author-form-field">
                <TextField id='project-title' label="Project Title" variant="filled" />
                <TextField id='author-name' label="Author Name" variant="filled" />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="task-details-form-field">
                <p>ADD A NEW TASK:</p>
                <TextField id='task-name' label="Task Name" variant="filled" />
                <TextField id='start-date' label="Start Date" variant="filled" />
                <TextField id='duration' label="Duration" variant="filled" />
              </div>
            </Grid>
          </Grid>
          <Button variant="contained" className="add-button">ADD</Button>
        </form>
    </div>
   );
}
 
export default UserInput;