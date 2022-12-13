import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Stack, TextField, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const defaultValues = {
	id: "",
	taskName: "",
	resource: "",
	startDate: null,
	endDate: null,
	duration: '',
	percentComplete: 0,
	dependencies: null
}

const MAX_TASKNAME_LENGTH = 32;
const MAX_DAYS = 180;

const TaskForm = ({ addTask }) => {
	const [ task, setTaskValue ] = useState(defaultValues);
	const [ missingName, setMissingName] = useState("");
	const [ missingDate, setMissingDate] = useState("");
	const [ missingDuration, setMissingDuration] = useState("");

	const handleTaskInputChange = e => {
		const value = e.target.value;
		setTaskValue({ ...task, [e.target.name]: value });

		// reset missing info errors on next input change
		setMissingName(false);
		setMissingDate(false);
		setMissingDuration(false);
	}

	// handles the task list when the add button is pressed
	const handleSubmit = e => {
		e.preventDefault();

		// used for showing error in text box
		if(task.taskName.length === 0){
			setMissingName(true);
		}
		if(task.startDate == null){
			setMissingDate(true);
		}
		if(task.duration === ""){
			setMissingDuration(true);
		}

		if(((task.taskName.length !== 0) && (task.taskName.length <= MAX_TASKNAME_LENGTH)) && (task.startDate != null) && (0 < task.duration && task.duration <= MAX_DAYS)){
			// adds the task to the list with a generated unique ID
			// remove resource if you don't want a rainbow gantt chart
			addTask({ ...task, id: uuidv4(), resource: uuidv4()});

			// reset task form boxes to become empty
			setTaskValue({ ...task, taskName: '', startDate: null, endDate: null, duration: '' });
		}
	}

	return (
		<div className="inner-container">
			<form noValidate autoComplete='off' onSubmit={handleSubmit}>
				<h4>ADD NEW TASK:</h4>
				<div>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Stack className='form-wrapper' spacing={1}>
							<TextField
								error={(task.taskName.length >= MAX_TASKNAME_LENGTH) || (missingName)}
								className="input-box"
								label="Task Name"
								name="taskName"
								value={task.taskName}
								size="small"
								onChange={(e) => {
									handleTaskInputChange(e);
									setMissingName("");
								}}
								helperText={(task.taskName.length >= MAX_TASKNAME_LENGTH) ? "Task name too long!": ""}
							/>
							<MobileDatePicker
								closeOnSelect
								className="input-box"
								label="Start Date"
								inputFormat="MM/DD/YYYY"
								value={task.startDate}
								onChange={(e) => {
									setTaskValue({ ...task, startDate: e, endDate: e});
									setMissingDate("");
								}}
								renderInput={(params) => <TextField {...params} error={missingDate} size='small'/>}
							/>
							<TextField
								error={(task.duration > MAX_DAYS) || (task.duration < 0) || (missingDuration)}
								className='input-box'
								type="number"
								InputProps={{ inputProps: { min: 0, max: MAX_DAYS}}}
								label="Duration (days)"
								name="duration"
								value={task.duration}
								size="small"
								onChange={(e) => {
									handleTaskInputChange(e);
									setMissingDuration("");
								}}
								helperText={(task.duration > MAX_DAYS) || (task.duration < 0) ? "Duration must be greater than zero and less than 180 days": ""}
							/>
							<div className="right">
								<Button type="submit" variant="contained" size="small" sx={{ palette: {mode: 'dark',}, borderRadius: 50 }}>ADD TASK</Button>
							</div>
						</Stack>	
					</LocalizationProvider>
				</div>
			</form>
		</div>
	);
}

export default TaskForm;
