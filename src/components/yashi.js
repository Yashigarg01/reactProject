import React, { useEffect, useState } from 'react'

function Yashi() {
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response)=>response.json())
        .then((data)=>setData(data))
        .catch(error=>console.error("fetching error:",error));
        
    },[])

  return (
   <>
    <div>
        <div>table data</div>
        <table>
            <thead>
                <tr>
                    <th>USER ID</th>
                    <th>ID</th>
                    <th>TITLE</th>
                    <th>COMPLETED</th>
                </tr>
            </thead>
            <tbody>
               {data.map((item)=>(
                <tr key={item.id}>
                    <td>{item.userId}</td>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.completed?"yes":"no"}</td>
                </tr>

               ))}
            </tbody>
        </table>
    </div>
   </>
  )
}

export default Yashi