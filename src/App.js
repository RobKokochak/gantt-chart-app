import GanttChart from "./GanttChart";
import TaskList from "./TaskList";
import UserInput from "./UserInput";

function App() {
  return (
    <div className="App">
      <div className="content">
        <UserInput />
        <TaskList />
        <GanttChart />
      </div>
    </div>
  );
}

export default App;