import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Todo() {

    const [input, setInput] = useState("");
    const [list, setList] = useState([]);  // Initialize list as an empty array
    const [editIndex, setEditIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleEvent = (e) => {

        
        setInput(e.target.value)
    }
    const handleTask = () => {
        if (input.trim() !== "") {
            if (isEditing && editIndex !== null) {
                // if in edit mode update the list
                const updatedList = list.map((item, i) =>
                    i === editIndex ? input : item
                );
                setList(updatedList);
                setEditIndex(false)//turn off edit mode
                setIsEditing(null)//clear the edit index
            } else {
                setList([...list, input]);
                // Spread previous list and add the new input
            }
            setInput("");// Clear the input field after adding the task
        }
    };
    const handleEdit = (index) => {
        setInput(list[index]);// Set the input field to the value of the task being edited
        setEditIndex(index);// Set the index of the task being edited
        setIsEditing(true);// Toggle to editing mode
    }
    const handleDelete = (index) => {
        const newList = list.filter((_, i) => i !== index); // Filter out the item at the given index
        setList(newList); // Update the list with the new array
    };
    return (
        <>
            <div>
                <h2 className="text-center ">Todo app</h2>
                <div className="Container">
                    <div className="input-box">
                        <input type="text" value={input} onChange={handleEvent} placeholder="add task" />
                        <button className="btn btn-primary btn-sm" onClick={handleTask}>{isEditing ? "Update" : "Add"}</button>
                    </div>
                    <div className="list">
                        <div className="list-group">
                            <ul>
                                {list.map((item, i) => 
                                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">{item}
                                <div>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(i)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => handleDelete(i)}
                                    >
                                        Delete
                                    </button>
                                </div></li>)}
                                {/* Make sure to include a unique key for each item */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Todo;