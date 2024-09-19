import { useState } from "react";

function Greeting() {
    const [name, setName] = useState("");
    const [greet, setGreet] = useState("");

    const handleInputChange = (e) => {

        setName(e.target.value);
    };

    const generateGreet = (e) => {
        e.preventDefault();
        setGreet(`hello,${name}! welcome to the greeting app`);
    }


    return (
        <>
            <div>
                <form onSubmit={generateGreet}>
                    <input
                        type='text'
                        value={name}
                        onChange={handleInputChange}
                        placeholder='enter your name' />
                    <button type="submit">greet me!</button>
                </form>
                {greet && <h2>{greet}</h2>}
            </div>
        </>


    )


}
export default Greeting;