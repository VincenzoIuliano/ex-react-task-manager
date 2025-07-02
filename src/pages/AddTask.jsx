import { useState, useRef, useMemo, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`;

export default function AddTask() {
    const { addTask } = useContext(GlobalContext);

    const [taskTitle, setTaskTitle] = useState("");
    const descriptionRef = useRef();
    const statusRef = useRef();

    const taskTitleError = useMemo(() => {
        if(!taskTitle.trim()) {
            return "Il nome della task non può essere vuoto.";
        }
        if(taskTitle.split("").some(char => symbols.includes(char))) {
            return "Il nome della task non può contenere caratteri speciali.";
        }
        return "";
    }, [taskTitle]);

    const handleSubmit = async e => {
        e.preventDefault();
        if(taskTitleError) {
            return;
        }
        const newTask = {
            title: taskTitle.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value,
        };
         console.log("Nuova task:", newTask);
        
        try{
            await addTask(newTask);
            alert("Task aggiunta con successo");
            setTaskTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = "todo"; // Reset to default status
        }catch (error) {
             alert("Errore durante l'aggiunta della task:", error.message);
            return;
        }
    }

    return (
        <div>
            <h1 className="add_task">Aggiungi una nuova task</h1>
            <form onSubmit={handleSubmit}>

                <label>
                    Nome task:
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder="Inserisci il nome della task"
                    />
                </label>
                { taskTitleError && (
                    <p style={{color: 'yellow'}}>{taskTitleError}</p> 
                )}

                <label>
                    Descrizione:
                    <textarea
                        ref={descriptionRef}
                        placeholder="Inserisci la descrizione della task"
                    />
                </label>

                <label>
                    Stato:
                    <select ref={statusRef}>
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </label>

                <button type="submit" disabled={taskTitleError}>Aggiungi Task</button>

            </form>
        </div>
    );
}