import { BrowserRouter, Route, Routes, NavLink} from "react-router-dom"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"

function App() {
  
  return (
    <>
     <BrowserRouter>
     
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>Task List</NavLink>
          </li>
          <li>
            <NavLink to="/add">Add Task</NavLink>
          </li>
        </ul>
      </nav>

      <Routes>  
        <Route path="/" element={<TaskList/>} />
        <Route path="/add" element={<AddTask/>} />
      </Routes>     
     
     </BrowserRouter>
    </>
  )
}

export default App
