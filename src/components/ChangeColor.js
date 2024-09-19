/* eslint-disable no-const-assign */
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
function ChangeColor() {
    const [bgColor, setBgColor] = useState("#ffffff");



    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
           
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const changeColor = () => {
        const newColor = getRandomColor();
        setBgColor(newColor);
    };

    return (
        <>
            <div style={{
                backgroundColor: bgColor,
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <button className="btn btn-primary btn-lg" onClick={changeColor}> Change Background Color </button>
            </div>
        </>
    );
}
export default ChangeColor;