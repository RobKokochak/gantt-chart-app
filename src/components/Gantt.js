import React from "react";
import { Chart } from "react-google-charts";
import { Button, Stack } from '@mui/material';
import html2canvas from "html2canvas";

const daysBetweenDates = (a,b) => {
  let milliseconds = b.getTime() - a.getTime();
  let days = milliseconds / (1000 * 3600 * 24);
  return Math.ceil(days);
}

const GanttChart = ({ tasks, title, author }) => {
  let projectLength = 0;
  const printRef = React.useRef();

  // allows chart to be downloaded as a jpg
  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'Gantt.jpg';

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

  // converting end date
  const durationToEndDate = (arr) => {
    if (arr.length > 0){
      for (let i = 0; i < arr.length; i++){
        let temp = arr[i][4];
        temp = JSON.stringify(temp).slice(1, 11);
        let parts = temp.split('-');
        arr[i][4] = new Date(parts[0], parts[1] - 1, parts[2]);
        temp = arr[i][4];
        temp.setDate(temp.getDate() + parseInt(arr[i][5]));
        arr[i][4]  = new Date(temp);
      }
    };
  }
  
  // taking user duration and storing the calculated end date into the object
  durationToEndDate(tasksObjectsToGantt);

  if(tasksObjectsToGantt.length > 0){
    let projectStartDate = new Date(tasksObjectsToGantt[0][3]);         // projectStartDate is the first start day in the tasksObjectsToGantt array
    const endDates = tasksObjectsToGantt;                               // creating new array to sort data by endDate
    
    // sorting new endDates array
    endDates.sort(function compare(a, b) {
      let dateA = new Date(a[4]);
      let dateB = new Date(b[4]);
      return dateA - dateB;
    });
    
    let projectEndDate = new Date(endDates[endDates.length-1][4]);      // projectEndDate is the last end day in the endDates array.
    projectLength = daysBetweenDates(projectStartDate, projectEndDate); // projectLength is the amount of days between the start date and end date
  }

  // removing old duration from object
  const removeDuration = (arr) => {
    if (arr.length > 0){
      for (let i = 0; i < arr.length; i++){
        arr[i][5] = "";
      }
    };
  }

  // transforming gantt input data
  convertDateToGanttFormat(tasksObjectsToGantt);
  removeDuration(tasksObjectsToGantt);

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
          <h5>TOTAL PROJECT LENGTH: {projectLength} DAYS</h5>
          </div>
          <div className="right">
            <Button onClick={handleDownloadImage} type="button" variant="contained" size="small" style={{ borderRadius: 50 }}>DOWNLOAD IMAGE</Button>
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
