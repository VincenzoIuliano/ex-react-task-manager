import { useParams } from "react-router-dom"
import { useContext} from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function TaskDetails() {

    const { id } = useParams()
    const { tasks } = useContext(GlobalContext)

    const task = tasks.find(task => task.id === parseInt(id))

    if (!task) {
        return <h1>Task not found</h1>        
    }
    
    const handleDelete = () => {
        console.log('Eliminazione task con ID:', task.id);
    }

    return (
        <div className="task-details">
            <h2>Task</h2>
            <p><strong>Nome:</strong> {task.title}</p>
            <p><strong>Descrizione:</strong> {task.description}</p>
            <p><strong>Stato:</strong> {task.status}</p>
            <p><strong>Data di creazione:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
            <button onClick={handleDelete}>Elimina Task</button>
        </div>
    )
}