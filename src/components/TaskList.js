import Task from './Task';
import { Stack } from "@mui/system";
import { Button } from '@mui/material';

const TaskList = ({ tasks, removeTask, removeAllTasks }) => {

	//sorts the tasks array by date
	tasks.sort(function compare(a, b) {
		var dateA = new Date(a.startDate);
		var dateB = new Date(b.startDate);
		return dateA - dateB;
	  });

	if (tasks.length > 0) {
		return (
			<Stack className="tasklist-container" spacing={1}>
				<div className='tasklist-wrapper'>
					<Stack container="true" spacing={1.5}>
						{tasks.map((task) => <Task key={task.id} task={task} removeTask={removeTask} />)}
					</Stack>
				</div>
				<form className="right" onSubmit={removeAllTasks}>
					<Button type="submit" variant="contained" size="small" style={{ borderRadius: 50 }}>CLEAR ALL</Button>
				</form>
			</Stack>
		);
	}	else {
		return (
			<Stack className="tasklist-container" spacing={1}>
				<div className='tasklist-wrapper'>
					<Stack container="true" spacing={1.5}>
						<h4>EMPTY</h4>
					</Stack>
				</div>
				<form className="right" onSubmit={removeAllTasks}>
					<Button type="submit" variant="contained" size="small" style={{ borderRadius: 50 }}>CLEAR ALL</Button>
				</form>
			</Stack>
		);
	}
	
}


export default TaskList;