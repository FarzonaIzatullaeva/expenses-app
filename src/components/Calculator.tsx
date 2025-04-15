"use client";
import { useState } from "react";
import { evaluate } from "mathjs";
import "../../styles/calculatorStyles.css";

function Calculator() {
    const [value, setValue] = useState<string>("");

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const val = e.currentTarget.value;
        setValue((prev) => prev + val);
    };

    const calculateResult = () => {
        try {
            setValue(evaluate(value).toString());
        } catch {
            setValue("Error");
        }
    };

    const clearInput = () => setValue("");
    const deleteLast = () => setValue(value.slice(0, -1));

    return (
        <div className="calculator-container">
            <div className="calculator">
                <input 
                    type="text" 
                    id="display" 
                    value={value} 
                    readOnly 
                />

                <div className="buttons">
                    <button type="button" onClick={clearInput} className="operator" value="AC">AC</button>
                    <button type="button" onClick={deleteLast} className="operator" value="DE">DE</button>
                    <button type="button" onClick={handleClick} value="." className="operator">.</button>
                    <button type="button" onClick={handleClick} value="/" className="operator">/</button>

                    <button type="button" onClick={handleClick} value="7">7</button>
                    <button type="button" onClick={handleClick} value="8">8</button>
                    <button type="button" onClick={handleClick} value="9">9</button>
                    <button type="button" onClick={handleClick} value="*" className="operator">×</button>

                    <button type="button" onClick={handleClick} value="4">4</button>
                    <button type="button" onClick={handleClick} value="5">5</button>
                    <button type="button" onClick={handleClick} value="6">6</button>
                    <button type="button" onClick={handleClick} value="-" className="operator">−</button>

                    <button type="button" onClick={handleClick} value="1">1</button>
                    <button type="button" onClick={handleClick} value="2">2</button>
                    <button type="button" onClick={handleClick} value="3">3</button>
                    <button type="button" onClick={handleClick} value="+" className="operator">+</button>

                    <button type="button" onClick={handleClick} value="00" className="zero">00</button>
                    <button type="button" onClick={handleClick} value="0" className="zero">0</button>
                    <button type="button" onClick={calculateResult} className="equals">=</button>
                </div>
            </div>
        </div>
    );
}

export default Calculator;
