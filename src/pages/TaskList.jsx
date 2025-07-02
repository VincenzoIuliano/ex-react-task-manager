import { useContext, useMemo, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
    
    const { tasks } = useContext(GlobalContext);

    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState(1);

    const sortIcons = sortOrder === 1 ? "↑" : "↓";
    
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(-sortOrder);
        }else {
            setSortBy(field);  
            setSortOrder(1);
        }
    }

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            let comparison = 0;
            if (sortBy === "title") {
                comparison = a.title.localeCompare(b.title);
            } else if (sortBy === "status") {
                const statusOptions = ["todo", "in-progress", "done"];
                comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status);
            } else if (sortBy === "createdAt") {
                comparison = new Date(a.createdAt) - new Date(b.createdAt);
            }
            return comparison * sortOrder;
        });
    }, [tasks, sortBy, sortOrder]);

    return (
        <table>
            <thead>
                <tr>
                    <th onClick={() => handleSort('title')}>
                        Nome
                        {sortBy === 'title' && <span>{sortIcons}</span>}
                    </th>
                    <th onClick={() => handleSort('status')}>
                        Stato
                        {sortBy === 'status' && <span>{sortIcons}</span>}
                    </th>
                    <th onClick={() => handleSort('createdAt')}>
                        Data di creazione
                        {sortBy === 'createdAt' && <span>{sortIcons}</span>}
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedTasks.map((task) => (
                    <TaskRow key={task.id} task={task} />
                ))}
            </tbody>
        </table>    
    );
}