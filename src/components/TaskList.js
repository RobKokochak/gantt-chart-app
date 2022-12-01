import Task from './Task';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { Paper } from '@mui/material';

const TaskList = ({ tasks, removeTask }) => {

	//sorts the tasks array by date
	tasks.sort(function compare(a, b) {
		var dateA = new Date(a.startDate);
		var dateB = new Date(b.startDate);
		return dateA - dateB;
	  });

	console.log(tasks);
	
	return (
		<Paper style={{ maxHeight: 470, overflow: 'auto', borderRadius: 25}}>
			<List className="inner-container" sx={{ width: '100%', bgcolor: 'rgba(92, 103, 140, 0.4)' }}>
				<ul>{tasks.map((task) => <Task key={task.id} task={task} removeTask={removeTask} />)}</ul>
			</List>
		</Paper>
	);
	
}


export default TaskList;