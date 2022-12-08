import React from "react";
import { Chart } from "react-google-charts";
import { Button, Stack } from '@mui/material';
import html2canvas from "html2canvas";

const GanttChart = ({ tasks, title, author }) => {
  const printRef = React.useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'Gantt.jpeg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };
  // Converting Object array to an Array of arrays  (first step of converting localStorage date string to something Google Gantt can read)
  const tasksObjectsToGantt = tasks.map( Object.values );

  // This function converts the broken date string after page reload to something the Google Gantt component can read
  const convertDateToGanttFormat = (arr) => {
    if (arr.length > 0){
      for (let i = 0; i < arr.length; i++){
        let temp = arr[i][3];
        temp = JSON.stringify(temp).slice(1, 11);
        let parts = temp.split('-');
        arr[i][3] = new Date(parts[0], parts[1] - 1, parts[2]);
      }
    };
  }

  const convertDurationToGanttFormat = (arr) => {
    if (arr.length > 0){
      for (let i = 0; i < arr.length; i++){
			  arr[i][5] = arr[i][5] * 24 * 60 * 60 * 1000;
      }
    }
  }

  convertDurationToGanttFormat(tasksObjectsToGantt);
  convertDateToGanttFormat(tasksObjectsToGantt);
  console.log(tasksObjectsToGantt);

  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  const data = [columns, ...tasksObjectsToGantt];

  const options = {
    height: 120 + (tasks.length * 40),
    backgroundColor: {
    },
    gantt: {
      criticalPathEnabled: false,
      percentEnabled: false,
      trackHeight: 40,
    },
    labelStyle: {
      color: '#FFFFFF',
    }
  };

  // FIX ME DEBUGGER

  if (tasksObjectsToGantt[0] != null) {
    return (
      <div>
        <Stack className="inner-container" spacing={1}>
          <div ref={printRef} className="gantt-wrapper">
            <div>
              <h1>{title}</h1>
              <p>{author}</p>
            </div>
            <Chart
              id="report"
              chartType="Gantt"
              width="100%"
              height="50%"
              data={data}
              options={options}
            />
          </div>
          <div className="right">
            <Button onClick={handleDownloadImage} type="button" variant="contained" size="small" style={{ borderRadius: 50 }}>DOWNLOAD JPG</Button>
				  </div>
        </Stack>
      </div>
    )}
    else {
      return (
        <div>
        <div className="inner-container">
          <h4>Submit a task to get started.</h4>
        </div>
      </div>
      )
    }
}

export default GanttChart;
