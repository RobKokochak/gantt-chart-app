import { Button, Grid, TextField } from "@mui/material";

const UserInput = ({ title, setTitle, author, setAuthor }) => {

  return ( 
    <div className="user-input">
      <h1>Gantt Chart Tool</h1>
      <p>This tool allows you to generate a Gantt chart given a set of tasks, start dates, and durations. Fill out the information below to get started.</p>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="title-author-form-field">
                <TextField id='project-title' label="Project Title" variant="filled" value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextField id='author-name' label="Author Name" variant="filled" value={author} onChange={(e) => setAuthor(e.target.value)} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <form>
                <div className="task-details-form-field">
                  <p>ADD A NEW TASK:</p>
                  <TextField id='task-name' label="Task Name" variant="filled" />
                  <TextField id='start-date' label="Start Date" variant="filled" />
                  <TextField id='duration' label="Duration" variant="filled" />
                </div>
                <Button variant="contained" className="add-button">ADD</Button>
              </form>
            </Grid>
          </Grid>
    </div>
   );
}
 
export default UserInput;