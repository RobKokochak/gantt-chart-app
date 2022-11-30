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
		id: '',
		taskName: '',
		startDate: null,
		duration: ''
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
		<div className="task-form">
			<form onSubmit={handleSubmit}>
				<p>ADD NEW TASK:</p>
				<div className="task-form-boxes">
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Stack spacing={1}>
							<TextField
								className='input-box'
								label="Task Name"
								name="taskName"
								value={task.taskName}
								size="small"
								onChange={handleTaskInputChange}
							/>
							<MobileDatePicker
								//disablePast //disables old dates
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
							<p2>
								<Button type="submit" variant="contained" size="small" style={{ borderRadius: 50 }}>ADD</Button>
							</p2>
						</Stack>	
					</LocalizationProvider>
				</div>
			</form>
		</div>
	);
}

export default TaskForm;
