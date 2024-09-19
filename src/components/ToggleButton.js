import { useState } from "react";

function ToggleButton() {
    const [isOn, setIsOn] = useState(false);

    const toggleButton = () => {
        setIsOn((prevState) => !prevState);
    };
    return (
        <>
            <div>
                <button onClick={toggleButton}>{isOn ? 'ON' : 'OFF'}</button>
            </div>
        </>

    );
}
export default ToggleButton;