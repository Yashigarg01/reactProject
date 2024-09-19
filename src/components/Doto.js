import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';

function Todo() {
    const [input, setInput] = useState("");
    const [date, setDate] = useState(""); // State for the selected date
    const [list, setList] = useState([]);  // Each item is an object { task: '', date: '', completed: false, file: '' }
    const [editIndex, setEditIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTask, setSelectedTask] = useState(null); // Track the selected task for export

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const handleTask = () => {
        const currentDate = getCurrentDate(); // Default to current date

        if (input.trim() !== "") {
            if (isEditing && editIndex !== null) {
                // If in edit mode, update the list
                const updatedList = list.map((item, i) =>
                    i === editIndex ? { ...item, task: input, date: date || currentDate } : item
                );
                setList(updatedList);
                setIsEditing(false); // Turn off edit mode
                setEditIndex(null); // Clear the edit index
            } else {
                setList([...list, { task: input, date: date || currentDate, completed: false, file: '' }]); // Add new task with current or manual date
            }
            setInput(""); // Clear the input field
            setDate(""); // Clear the date field
        }
    };

    const handleEdit = (index) => {
        setInput(list[index].task); // Set the input field to the task being edited
        setDate(list[index].date); // Set the date field to the date of the task being edited
        setEditIndex(index); // Set the index of the task being edited
        setIsEditing(true); // Toggle to editing mode
    };

    const handleDelete = (index) => {
        const newList = list.filter((_, i) => i !== index); // Filter out the item at the given index
        setList(newList); // Update the list with the new array
    };

    const handleComplete = (index) => {
        const updatedList = list.map((item, i) =>
            i === index ? { ...item, completed: !item.completed } : item
        );
        setList(updatedList); // Update the list with the new completion status
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value); // Update the search query state
    };

    const handleFileChange = (index, e) => {
        const file = e.target.files[0];
        const updatedList = list.map((item, i) =>
            i === index ? { ...item, file: file.name } : item
        );
        setList(updatedList);
    };

    const handleExport = (task) => {
        const doc = new jsPDF();
        doc.text(`Task: ${task.task}`, 10, 10);
        doc.text(`Date: ${task.date}`, 10, 20);
        if (task.file) {
            doc.text(`File: ${task.file}`, 10, 30);
        }
        doc.save(`task-${task.date}.pdf`);
    };

    const filteredList = list.filter((item) =>
        item.task.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const tasksByDate = filteredList.reduce((acc, task) => {
        acc[task.date] = acc[task.date] ? [...acc[task.date], task] : [task];
        return acc;
    }, {});

    return (
        <>
            <div>
                <h2 className="text-center">Todo app</h2>
                <div className="container">
                    <div className="input-box mb-3">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Add task"
                            className="form-control"
                        />
                        <input
                            type="date"
                            value={date}
                            onChange={handleDateChange}
                            className="form-control mt-2"
                            placeholder="Select date (optional)"
                        />
                        <button
                            className="btn btn-primary btn-sm mt-2"
                            onClick={handleTask}
                        >
                            {isEditing ? "Update" : "Add"}
                        </button>
                    </div>

                    {/* Search input */}
                    <div className="mb-3">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search tasks"
                            className="form-control"
                        />
                    </div>

                    <div className="list">
                        {Object.keys(tasksByDate).map((dateKey) => (
                            <div key={dateKey}>
                                <h4>{dateKey}</h4>
                                <ul className="list-group">
                                    {tasksByDate[dateKey].map((item, i) => (
                                        <li
                                            key={i}
                                            className={`list-group-item d-flex justify-content-between align-items-center ${item.completed ? "completed" : ""}`}
                                        >
                                            <span
                                                style={{
                                                    textDecoration: item.completed ? 'line-through' : 'none',
                                                    color: item.completed ? 'green' : 'black'
                                                }}
                                            >
                                                {item.task}
                                            </span>
                                            <div>
                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => handleEdit(list.indexOf(item))}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm me-2"
                                                    onClick={() => handleDelete(list.indexOf(item))}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() => handleComplete(list.indexOf(item))}
                                                >
                                                    {item.completed ? "Unmark" : "Complete"}
                                                </button>
                                                <button
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() => handleExport(item)}
                                                >
                                                    Export PDF
                                                </button>
                                                <input
                                                    type="file"
                                                    className="form-control mt-2"
                                                    onChange={(e) => handleFileChange(list.indexOf(item), e)}
                                                />
                                                {item.file && <span className="ms-2">File: {item.file}</span>}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Todo;
