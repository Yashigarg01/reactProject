import React, { useEffect, useState } from "react";

const DigitalClock =()=>{
    const [time, setTime]=useState(new Date());

    useEffect( ()=>
    {
        const interval= setInterval(()=>{
            setTime(new Date());
        },1000
        );
        return ()=>clearInterval(interval)
    },[]);
    const formattedTime = time.toLocaleTimeString();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <h1 className="text-white display-4">{formattedTime}</h1>
    </div>
  );
};

export default DigitalClock;

