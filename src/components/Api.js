import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function FetchApi() {
    // State for storing fetched data
    const [data, setData] = useState([]);
    
    // State for handling loading
    const [loading, setLoading] = useState(true);
    
    // State for handling errors
    const [error, setError] = useState(null);
    
    // State for controlling modal visibility
    const [show, setShow] = useState(false);
    
    // State for selected row details in the modal
    const [selectedRow, setSelectedRow] = useState(null);
    
    // State for search query (searching by id or title)
    const [search, setSearch] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setSelectedRow(item);
        setShow(true);
    }

    useEffect(() => {
        // Fetch data from the API
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);  // Data fetched successfully, stop loading
            })
            .catch((error) => {
                setError("Failed to fetch data");
                setLoading(false);  // Error occurred, stop loading
            });
    }, []);

    // Function to filter data based on the search query
    const filteredData = data.filter(item => {
        return item.title.toLowerCase().includes(search.toLowerCase()) ||
               item.id.toString().includes(search);
    });

    return (
        <>
            <div className="Container d-flex justify-content-center align-items-center flex-column">

                <div>
                    <h2 className="text-center mb-4">Data Table</h2>
                    
                    {/* Input for searching */}
                    <input 
                        type="text" 
                        className="form-control mb-3" 
                        placeholder="Search by id or title" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />

                    {/* Loading state */}
                    {loading && <p>Loading data...</p>}

                    {/* Error handling */}
                    {error && <p className="text-danger">{error}</p>}

                    {/* Data table */}
                    {!loading && !error && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>User Id</th>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Completed</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.userId}</td>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.completed ? "Yes" : "No"}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleShow(item)}>Action</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Modal for showing selected row details */}
                {selectedRow && (
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Row Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><strong>User ID: </strong>{selectedRow.userId}</p>
                            <p><strong>ID: </strong>{selectedRow.id}</p>
                            <p><strong>Title: </strong>{selectedRow.title}</p>
                            <p><strong>Completed: </strong>{selectedRow.completed ? "Yes" : "No"}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </>
    );
}
export default FetchApi;
