import { Grid, TextField, Stack } from "@mui/material";

const MAX_TITLE_LENGTH = 42;
const MAX_AUTHOR_LENGTH = 128;

const UserInput = ({ title, setTitle, author, setAuthor }) => {

  return ( 
    <div className="inner-container">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <TextField 
              size="small"
              className="input-box"
              id='project-title'
              label="Project Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              inputProps={{ maxLength: MAX_TITLE_LENGTH }}/>
            <TextField 
              size="small"
              className="input-box"
              id='author-name'
              label="Author Name"
              variant="outlined"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              inputProps={{ maxLength: MAX_AUTHOR_LENGTH }}/>
          </Stack>
        </Grid>
      </Grid>
    </div>
   );
}
 
export default UserInput;