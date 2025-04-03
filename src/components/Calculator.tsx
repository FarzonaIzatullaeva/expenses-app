"use client";
import { useState } from "react";
import "../../styles/calculatorStyles.css";

function App() {
    const [value, setValue] = useState<string>("");

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setValue((prev) => prev + target.value);
    };

    const calculateResult = () => {
        try {
            setValue(eval(value).toString()); // Replaced `Function()` with `eval()` for simplicity
        } catch {
            setValue("Error");
        }
    };

    return (
        <div className="container">
            <div className="calculator">
                <div id="main-line">
                    <input 
                        type="text" 
                        id="main-input" 
                        value={value} 
                        onChange={(e) => setValue(e.target.value)} 
                    />
                </div>

                <div id="row-1">
                    <input type="button" value="AC" onClick={() => setValue("")} className="button"/>
                    <input type="button" value="DE" onClick={() => setValue(value.slice(0, -1))} className="button"/>
                    <input type="button" value="." onClick={handleClick} className="button"/>
                    <input type="button" value="/" onClick={handleClick} className="button"/>
                </div>
                <div id="row-2">
                    <input type="button" value="7" onClick={handleClick} className="button"/>
                    <input type="button" value="8" onClick={handleClick} className="button"/>
                    <input type="button" value="9" onClick={handleClick} className="button"/>
                    <input type="button" value="*" onClick={handleClick} className="button"/>
                </div>
                <div id="row-3">
                    <input type="button" value="4" onClick={handleClick} className="button"/>
                    <input type="button" value="5" onClick={handleClick} className="button"/>
                    <input type="button" value="6" onClick={handleClick} className="button"/>
                    <input type="button" value="+" onClick={handleClick} className="button"/>
                </div>
                <div id="row-4">
                    <input type="button" value="1" onClick={handleClick} className="button"/>
                    <input type="button" value="2" onClick={handleClick} className="button"/>
                    <input type="button" value="3" onClick={handleClick} className="button"/>
                    <input type="button" value="-" onClick={handleClick} className="button"/>
                </div>
                <div id="row-5">
                    <input type="button" value="00" onClick={handleClick} className="button" id="zero-zero"/>
                    <input type="button" value="0" onClick={handleClick} id="zero" className="button"/>
                    <input type="button" value="=" id="equal" onClick={calculateResult} className="button"/>
                </div>
            </div>
        </div>
    );
}

export default App;
