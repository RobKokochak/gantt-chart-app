import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Stack } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'; 

const TaskForm = ({ addTask }) => {
	const [ task, setTaskValue ] = useState({
	id: "",
	taskName: "",
	resource: "",
	startDate: null,
	endDate: null,
	duration: '',
	percentComplete: 0,
	dependencies: null
});

	const handleTaskInputChange = e => {
		const value = e.target.value;
		setTaskValue({ ...task, [e.target.name]: value });
	}

	// handles the task list when the add button is pressed
	const handleSubmit = e => {
		e.preventDefault();
		if ((task.taskName.trim()) && (task.startDate != null) && (task.duration > 0)) {
			//adds the task to the list with a generated unique ID
			task.duration = parseInt(task.duration, 10);
			task.duration = task.duration * 24 * 60 * 60 * 1000;

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
			<form onSubmit={handleSubmit}>
				<h4>ADD NEW TASK:</h4>
				<div>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Stack spacing={1}>
							<TextField
								// sx={{ input: { color: 'white', } }}
								// autoComplete='false'
								className='input-box'
								label="Task Name"
								name="taskName"
								value={task.taskName}
								size="small"
								onChange={handleTaskInputChange}
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
								className='input-box'
								type="number"
								label="Duration"
								name="duration"
								value={task.duration}
								size="small"
								onChange={handleTaskInputChange}
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
