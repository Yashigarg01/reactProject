import { useState } from "react";

function Counter () {
    const [count , setCount] = useState(0);

    const increment =()=>{
        setCount(count+1);
    }

    const decrement =()=>{
        setCount(count-1);
    };

    return(
        <>
            <div>
            <button onClick={increment}>increment</button>
            <span> count digit {count}</span>
            <button onClick={decrement}>decrement</button>
            </div>
        </>
    )
    
}
export default Counter;