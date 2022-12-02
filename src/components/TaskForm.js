import { useState, useEffect } from 'react';
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

const MAX_LENGTH = 5;
const MAX_DAYS = 180;

const TaskForm = ({ addTask }) => {
	const [ task, setTaskValue ] = useState(defaultValues);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		// Set errorMessage only if text is equal or bigger than MAX_LENGTH
		if (task.taskName.length >= MAX_LENGTH) {
			setErrorMessage(
			"The input has exceeded the maximum number of characters"
			);
		}
		if (task.duration >= MAX_LENGTH) {
			setErrorMessage(
			"The duration is too large"
			);
		}
	  }, [task]);
	
	  useEffect(() => {
		// Set empty errorMessage only if text is less than MAX_LENGTH and errorMessage is not empty. avoids setting empty errorMessage if the errorMessage is already empty
		if (task.taskName.length < MAX_LENGTH && errorMessage) {
			setErrorMessage("");
		}
		if (task.duration < MAX_DAYS && errorMessage) {
			setErrorMessage("");
		}
	  }, [task, errorMessage]);


	const handleTaskInputChange = e => {
		const value = e.target.value;
		setTaskValue({ ...task, [e.target.name]: value });
	}

	// handles the task list when the add button is pressed
	const handleSubmit = e => {

		e.preventDefault();

		if ((task.taskName.length < MAX_LENGTH) && (task.startDate != null) && (0 < task.duration || task.duration <= MAX_DAYS)) { 
			// adds the task to the list with a generated unique ID
			addTask({ ...task, id: uuidv4()});

			// reset task form boxes to become empty
			setTaskValue({ ...task, taskName: '', startDate: null, duration: '' });
		}
		// else ERROR to user
	}

	// debugging statements that output the task and task array to the console
	console.log(task);

	return (
		<div className="container">
			<form noValidate autoComplete='off' onSubmit={handleSubmit}>
				<h4>ADD NEW TASK:</h4>
				<div>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Stack spacing={1}>
							<TextField
								error={task.taskName.length >= MAX_LENGTH}
								className='input-box'
								label="Task Name"
								name="taskName"
								value={task.taskName}
								size="small"
								onChange={handleTaskInputChange}
								helperText={errorMessage}
							/>
							<MobileDatePicker
								className='input-box'
								label="Start Date"
								inputFormat="MM/DD/YYYY"
								value={task.startDate}
								onChange={(newValue) => {
									setTaskValue({ ...task, startDate: newValue });
								}}
								renderInput={(params) => <TextField size='small'{...params} />}
							/>
							<TextField
								error={task.duration >= MAX_DAYS}
								className='input-box'
								type="number"
								label="Duration"
								name="duration"
								value={task.duration}
								size="small"
								onChange={handleTaskInputChange}
								helperText={errorMessage}
							/>
							<div className="right">
								<Button type="submit" variant="contained" size="small" style={{ borderRadius: 50 }}>ADD</Button>
							</div>
						</Stack>	
					</LocalizationProvider>
				</div>
			</form>
		</div>
	);
}

export default TaskForm;
