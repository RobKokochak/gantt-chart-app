import Task from './Task';
import { Chart } from "react-google-charts";

const daysToMilliseconds = (days) => {
  return days * 24 * 60 * 60 * 1000;
}

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
    "12312",
    "Spring 2014",
    "",
    new Date(2014, 2, 22),
    null,
    daysToMilliseconds(3),
    100,
    null,
  ],
  [
    "12312312321",
    "Test2",
    "",
    new Date(2014, 3, 27),
    null,
    daysToMilliseconds(3),
    100,
    null,
  ],
];

export const data = [columns, ...rows];

export const options = {
  height: 400,
  gantt: {
    trackHeight: 30,
  },
};

const GanttChart = ({ title, author }) => {
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