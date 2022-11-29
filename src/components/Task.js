import React from 'react';
import { IconButton } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

function Task({ task, removeTask }) {
	function handleRemoveClick() {
		removeTask(task.id);
	}

	return (
		<div className="task">
			<ul>Task: {task.taskName}</ul>
			<ul>Start Date: {task.startDate}</ul>
			<ul>Duration: {task.duration}</ul>
			<IconButton aria-label="delete" onClick={handleRemoveClick} size="small">
				<RemoveCircleRoundedIcon fontSize="inherit" />
			</IconButton>
		</div>
	);
}

export default Task;
