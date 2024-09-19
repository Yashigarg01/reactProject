import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function Create() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!name||!age||!email){
            alert("please fill all the feilds");
            return;
        }
        axios.post('https://66a4d1ce5dc27a3c1909e59f.mockapi.io/crud',{
            e_name:name,
            e_age:age,
            e_email:email
        })
        .then(()=>{
            navigate('/');
        })
        .catch((error) => {
            // Handle errors from the API call
            console.error("Error posting data:", error);
            alert("Failed to submit data. Please try again.");
          });
    }
    return (
        <>
            <div className='row'>
                <div className='col-md-4'>
                    <div>crud</div>
                    <div className='mb-2 mt-2'>
                        <Link to='/'>
                            <button className='btn btn-primary'>CREATE NEW DATA</button></Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>enter name:</label>
                            <input type='text'
                                placeholder='enter your name'
                                className='form-control'
                                onChange={(e) => setName(e.target.value)}>

                            </input>
                            <br />
                            <label>enter age:</label>
                            <input type='number' placeholder='enter your age' className='form-control'
                                onChange={(e) => setAge(e.target.value)}></input>
                            <br />
                            <label>enter email:</label>
                            <input type='email' placeholder='enter your email'
                                className='form-control'
                                onChange={(e) => setEmail(e.target.value)}></input>
                            <br />
                            <div className='d-grid'>
                                <button className='btn btn-primary'
                                    type='submit' value='submit'>Submit</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>

    )
}

export default Create