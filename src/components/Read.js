import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Read() {
    const [apiData, setApiData] = useState([])
    function getData() {
        axios.get('https://66a4d1ce5dc27a3c1909e59f.mockapi.io/crud')
            .then((response) => {
                setApiData(response.data)
            })
    }
    function handleDelete(id) {
        axios.delete(`https://66a4d1ce5dc27a3c1909e59f.mockapi.io/crud/${id}`)
            .then(() => {
                getData();
            })
    }
// step-2 fr delte url will be in backtics with id 
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='mb-2 mt-2'>
                        <Link to='/create'>
                            <button className='btn btn-primary'>CREATE NEW DATA</button></Link>
                    </div>
                    <table className='table table-bordered table-striped table-dark table-hover'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>AGE</th>
                                <th>EMAIL</th>
                                <th>EDIT</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                apiData.map((item) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.e_name}</td>
                                                <td>{item.e_age}</td>
                                                <td>{item.e_email}</td>
                                                <td>
                                                    <button className='btn btn-primary'>EDIT</button>
                                                </td>
                                                <td>
                                                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>DELETE</button> 
                                                    {/* step-1 */}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Read