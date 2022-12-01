import Task from './Task';
import { Chart } from "react-google-charts";

const GanttChart = ({ tasks, title, author }) => {

  console.log(tasks);

  const daysToMilliseconds = (days) => {
    return days * 24 * 60 * 60 * 1000;
  }

  
  // to convert our string to date.
  // var parts ='task.startDate'.split('-');
  // var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 

  // to convert days to milliseconds, use function above.

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

  const rows = [
    [
      "fcc77729-b73b-4cbd-a575-9b9ea7115aac",                // task.id
      "Spring 2014",          // task.taskName
      "",                     // task.resource (NOT USED)
      new Date(2014, 2, 22),  // task.startDate
      null,                   // task.endDate (NOT USED)
      daysToMilliseconds(5),  // task.duration
      0,                      // task.percentComplete (LEAVE AT 0)
      null,                   // task.dependencies (NOT USED)
    ],
    [
      "12312312321",
      "Test2",
      "",
      new Date(2014, 2, 29),
      null,
      daysToMilliseconds(3),
      100,
      null,
    ],
  ];

  const data = [columns, ...tasks];

  const options = {
    height: 400,
    gantt: {
      trackHeight: 30,
    },
  };

  return (
    <div>
      <div>
        <h1>{ title }</h1>
        <>{ author }</>
      </div>
      <div className="container">
        <Chart
          chartType="Gantt"
          width="100%"
          height="50%"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}

export default GanttChart;