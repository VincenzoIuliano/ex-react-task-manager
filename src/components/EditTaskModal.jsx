import { useState, useRef } from "react"
import Modal from "./Modal"

export default function EditTaskModal ({show, onClose, task, onSave}) {

    const [editedTask, setEditedTask] = useState(task)
    const editFormRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedTask);
        onClose(); // chiudi il modal solo dopo il salvataggio
    };

    const changeEditedTask = (e, key) => {
        setEditedTask(prev => ({
            ...prev,
            [key]: e.target.value
        }));
    };

    return (
      <Modal
        title="Modifica Task"
        content={
          <form ref={editFormRef} onSubmit={handleSubmit}>
            <label>
              Nome:
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) => changeEditedTask(e, "title")}
              />
            </label>
            <label>
              Descrizione:
              <textarea
                value={editedTask.description}
                onChange={(e) => changeEditedTask(e, "description")}
              />
            </label>
            <label>
              Stato:
              <select
                value={editedTask.status}
                onChange={(e) => changeEditedTask(e, "status")}
              >
                <option value="To do">To do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </label>
          </form>
        }
        show={show}
        onClose={onClose}
        onConfirm={() => {
          editFormRef.current.requestSubmit();
        }}
        confirmText="Salva"
      />
    );

}