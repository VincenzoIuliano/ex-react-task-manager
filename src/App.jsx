import { BrowserRouter, Route, Routes, NavLink} from "react-router-dom"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"
import { GlobalProvider } from "./context/GlobalContext"
import './App.css'
import TaskDetails from "./pages/TaskDetails"

function App() {
  
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          
          <nav className="navbar">
            <ul className="nav-links">
              <li>
                <NavLink to="/" end>
                  Task List
                </NavLink>
              </li>
              <li>
                <NavLink to="/add">Add Task</NavLink>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App
