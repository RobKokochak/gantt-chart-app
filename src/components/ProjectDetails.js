import { Grid, TextField } from "@mui/material";
import { Stack } from '@mui/material';

const UserInput = ({ title, setTitle, author, setAuthor }) => {

  return ( 
    <div className="project-details">
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack spacing={1}>
                  <TextField size="small" className="input-box" id='project-title' label="Project Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <TextField size="small" className="input-box" id='author-name' label="Author Name" variant="outlined" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </Stack>
            </Grid>
          </Grid>
    </div>
   );
}
 
export default UserInput;