import { IconButton } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

const Task = ({ task, removeTask }) => {
	const handleRemoveClick = () => removeTask(task.id);

	return (
		<div className="task">
			<div>Task: {task.taskName} Start Date: {JSON.stringify(task.startDate).slice(1, 11)} Duration: {parseInt(task.duration, 10)} days</div>
			<IconButton aria-label="delete" onClick={handleRemoveClick} size="large">
				<RemoveCircleRoundedIcon fontSize="inherit" />
			</IconButton>
		</div>
	);
}

export default Task;
