import { IconButton } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const Task = ({ task, removeTask }) => {
	const handleRemoveClick = () => removeTask(task.id);

	// converts date from 2022-2-14 to 2/14/2022
	const correctFormattedDate = (date) => {
		let temp = date;
        temp = JSON.stringify(temp).slice(1, 11);
        let parts = temp.split('-');
        temp = `${parts[1]}/${parts[2]}/${parts[0]}`;
		return temp;
	}

	return (
		<div className="task">
			<div className="task-details">
				Task: {task.taskName}
				<br />Start Date: {correctFormattedDate(task.startDate)}
				<br />Duration: {parseInt(task.duration, 10)} days
			</div>
			<div className="vertical-center">
				<IconButton aria-label="delete" onClick={handleRemoveClick} size="large">
					<RemoveCircleIcon fontSize="inherit" />
				</IconButton>
			</div>
		</div>
	);
}

export default Task;
