import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState} from "react"
import { GlobalContext } from "../context/GlobalContext"
import Modal from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal"

export default function TaskDetails() {

    const { id } = useParams()
    const navigate = useNavigate()
    const { tasks, removeTask, updateTask } = useContext(GlobalContext)
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const task = tasks.find(task => task.id === parseInt(id))

    if (!task) {
        return <h1>Task not found</h1>        
    }
    
    const handleDelete = async () => {
        try {
            await removeTask(task.id)
            alert("Task eliminata con successo")
            navigate('/')
        } catch (error) {
            console.error("Error deleting task:", error)
            alert("Errore durante l'eliminazione della task")
        }
    }

    const handleUpdate = async (updatedTask) => {
        
        try {
            await updateTask(updatedTask)
            setShowEditModal(false)
            alert("Task aggiornata con successo")
        } catch(error) {
            console.error("Error updating task:", error)
            alert("Errore durante l'aggiornamento della task")
        }
    }

    return (
        <div className="task-details">
            <h2>Task</h2>
            <p><strong>Nome:</strong> {task.title}</p>3
            <p><strong>Descrizione:</strong> {task.description}</p>
            <p><strong>Stato:</strong> {task.status}</p>
            <p><strong>Data di creazione:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
            <button onClick={() => setShowModal(true)}>Elimina Task</button>
            <button onClick={() => setShowEditModal(true)}>Modifica Task</button>
            

            <Modal
                title="Conferma Eliminazione"  
                content="Sei sicuro di voler eliminare questa task?"
                show={showModal}    
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina"
            />

            <EditTaskModal
                task={task}
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleUpdate}
            />
        </div>
    )
}