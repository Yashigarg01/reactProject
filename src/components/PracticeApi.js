import React, { useEffect, useState } from 'react'

import  Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function PracticeApi() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (item) =>{
        setSelectedRow(item);
        setShow(true);
    }


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.log("error", error));
    }, []
    )
    return (
        <>
            <div>
                <div>
                    <h2>table data</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>ID</th>
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
                                    <td>{item.completed ? 'yes' : 'no'}</td>
                                    <button className='btn btn-primary' onClick={handleShow}>action</button>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   { selectedRow &&(
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                  ) }

                </div>
            </div>
        </>
    )
}

export default PracticeApi