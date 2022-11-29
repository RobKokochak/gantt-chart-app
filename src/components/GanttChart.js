const GanttChart = ({ title, author }) => {
  return ( 
    <div className="gantt-chart">
      <h1>{ title }</h1>
      <p>{ author }</p>
    </div>
   );
}
 
export default GanttChart;