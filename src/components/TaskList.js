import Task from './Task';
//import Typography from '@material-ui/core/Typography';

const TaskList = ({ tasks, removeTask }) => {
	console.log(tasks);
	return (
		<div className="task-list">
			<h3>Tasks:</h3>
			<ul>{tasks.map((task) => <Task key={task.id} task={task} removeTask={removeTask} />)}</ul>
		</div>
	);
}

export default TaskList;
