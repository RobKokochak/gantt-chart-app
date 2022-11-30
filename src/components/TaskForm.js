import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Stack } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { InputAdornment } from '@mui/material';

const TaskForm = ({ addTask }) => {
	const [ task, setTaskValue ] = useState({
		id: '',
		taskName: '',
		resource: '',
		startDate: null,
		endDate: null,
		duration: 0,
		percentComplete: 0,
		dependencies: ''
	});

	const handleTaskInputChange = e => {
		const value = e.target.value;
		setTaskValue({ ...task, [e.target.name]: value });
	}

	// handles the task list when the add button is pressed
	const handleSubmit = e => {
		e.preventDefault();
		if (task.taskName.trim()) {
			//adds the task to the list and gives it a unique id using uuid package
			addTask({ ...task, id: uuidv4() });

			// reset task form boxes to become empty
			setTaskValue({ ...task, taskName: '', startDate: null, duration: '' });
		}
	}

	// debugging statements that output the task and task array to the console
	console.log(task);
	console.log(JSON.stringify(task.startDate).slice(1, 11));

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<h4>ADD NEW TASK:</h4>
				<div>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Stack spacing={1}>
							<TextField
								sx={{ input: { color: 'white', } }}
								className='input-box'
								label="Task Name"
								name="taskName"
								value={task.taskName}
								size="small"
								onChange={handleTaskInputChange}
								endAdornment={<InputAdornment position="end">kg</InputAdornment>}
							/>
							<MobileDatePicker
								className='input-box'
								label="Start Date"
								inputFormat="MM/DD/YYYY"
								value={task.startDate}
								onChange={(newValue) => {
									setTaskValue({ ...task, startDate: JSON.stringify(newValue).slice(1, 11) });
								}}
								renderInput={(params) => <TextField size='small'{...params} />}
							/>
							<TextField
								className='input-box'
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
