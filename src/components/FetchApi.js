import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function FetchApi() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setSelectedRow(item);
        setShow(true);
    }


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.log("fetching error :", error));

    }, [])



    return (
        <>
            <div className="Container d-flex justify-content-center align-item-center">

                <div>
                    <h2 className="text-center mb-4">data table</h2>
                    <table className="table table-bodered">
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
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.userId}</td>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.completed ? "yes" : "No"}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleShow(item)}>action</button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
                {selectedRow && (
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Row details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><strong>user id</strong>{selectedRow.userId}</p>
                            <p><strong> id</strong>{selectedRow.id}</p>
                            <p><strong>title</strong>{selectedRow.title}</p>
                            <p><strong>completed</strong>{selectedRow.completed}</p>
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