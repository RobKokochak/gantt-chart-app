import Task from './Task';

const TaskList = ({ tasks, removeTask }) => {
	return (
		<div className="container">
			<ul>{tasks.map((task) => <Task key={task.id} task={task} removeTask={removeTask} />)}</ul>
		</div>
	);
}

export default TaskList;