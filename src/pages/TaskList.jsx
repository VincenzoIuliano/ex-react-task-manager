import { useContext, useMemo, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

// funzione di debounce 

function debounce(func, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(value);
        }, delay);
    }
}

export default function TaskList() {
    
    const { tasks } = useContext(GlobalContext);

    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useMemo(() => debounce(setSearchQuery, 500), []);

    const sortIcons = sortOrder === 1 ? "↑" : "↓";
    
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(-sortOrder);
        }else {
            setSortBy(field);  
            setSortOrder(1);
        }
    }

    const filteredAndSortedTasks = useMemo(() => {
        return [...tasks]
        .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
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
    }, [tasks, sortBy, sortOrder, searchQuery]);

    return (
    <div>
        <input 
            type="text"
            placeholder="Cerca un task"
            onChange={e => debouncedSearch(e.target.value)}
        />
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
                {filteredAndSortedTasks.map((task) => (
                    <TaskRow key={task.id} task={task} />
                ))}
            </tbody>
        </table>    
    </div>
    );
}