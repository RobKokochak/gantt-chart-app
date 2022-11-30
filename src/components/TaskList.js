import Task from './Task';
//import Typography from '@material-ui/core/Typography';

const TaskList = ({ tasks, removeTask }) => {
	return (
		<div className="container">
			<ul>{tasks.map((task) => <Task key={task.id} task={task} removeTask={removeTask} />)}</ul>
		</div>
	);
}

export default TaskList;