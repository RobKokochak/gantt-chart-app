import { Chart } from "react-google-charts";

const GanttChart = ({ tasks }) => {

  // Converting Object array to an Array of arrays  
  const tasksObjectsToGantt = tasks.map( Object.values );
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

  // TEST PURPOSES ONLY

  // const daysToMilliseconds = (days) => {
  //   return days * 24 * 60 * 60 * 1000;
  // }
  
  // const rows = [
  //   [
  //     "fcc77729-b73b-4cbd-a575-9b9ea7115aac",                // task.id
  //     "Test",          // task.taskName
  //     "",                     // task.resource (NOT USED)
  //     new Date(2014, 2, 22),  // task.startDate
  //     null,                   // task.endDate (NOT USED)
  //     daysToMilliseconds(5),  // task.duration
  //     0,                      // task.percentComplete (LEAVE AT 0)
  //     null,                   // task.dependencies (NOT USED)
  //   ],
  //   [
  //     "12312312321",
  //     "Test2",
  //     "",
  //     new Date(2014, 2, 29),
  //     null,
  //     daysToMilliseconds(3),
  //     100,
  //     null,
  //   ],
  // ];

  const data = [columns, ...tasksObjectsToGantt];

  const options = {
    height: 400,
    gantt: {
      trackHeight: 30,
    },
  };

  // FIX ME DEBUGGER

  if (tasksObjectsToGantt[0] != null) {
    return (
      <div>
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
    )}
    else {
      return (
        <div>
        <div className="container">
          <h4>(Submit a task to get started with the Gantt chart.)</h4>
        </div>
      </div>
      )
    }
}

export default GanttChart;