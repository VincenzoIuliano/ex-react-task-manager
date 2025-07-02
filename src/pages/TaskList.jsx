import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function TaskList() {
    
    const { tasks } = useContext(GlobalContext);
  
    return (
        <div className="task-list">
           Lista Task
        </div>    
    );
}