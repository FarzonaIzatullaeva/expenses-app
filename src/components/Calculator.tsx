"use client";
import { useState } from "react";
import '../../styles/calculatorStyles.css';

function App(){
    const[value, setValue] = useState('');
    return (
        <div className="container">
            <div className="calculator">
                <form action="">
                    <div id="main-line">
                        <input type="text" id="main-input" value={value}/>
                    </div>

                    <div id="row-1">
                        <input type="button" value="AC" onClick={e=>setValue('')} className="button"/>
                        <input type="button" value="DE" onClick={e=>setValue(value.slice(0,-1))} className="button"/>
                        <input type="button" value="." onClick={e=> setValue(value + e.target.value)} className="button"/>
                        <input type="button" value="/" onClick={e=> setValue(value + e.target.value)} className="button"/>
                    </div>
                    <div id="row-2">
                        <input type="button" value="7" onClick={e=> setValue(value + e.target.value)} className="button"/>
                        <input type="button" value="8" onClick={e=> setValue(value + e.target.value)} className="button"/>
                        <input type="button" value="9" onClick={e=> setValue(value + e.target.value)} className="button"/>
                        <input type="button" value="*" onClick={e=> setValue(value + e.target.value)} className="button"/>
                    </div>
                    <div id="row-3">
                        <input type="button" value="4" onClick={e=> setValue(value + e.target.value)} className="button"/>
                        <input type="button" value="5" onClick={e=> setValue(value + e.target.value)} className="button"/>
                        <input type="button" value="6" onClick={e=> setValue(value + e.target.value)} className="button"/>
                        <input type="button" value="+" onClick={e=> setValue(value + e.target.value)} className="button"/>
                    </div>
                    <div id="row-4">
                        <input type="button" value="1" onClick={e=> setValue(value + e.target.value)} className="button"/>
                        <input type="button" value="2" onClick={e=> setValue(value + e.target.value)} className="button"/>
                        <input type="button" value="3" onClick={e=> setValue(value + e.target.value)} className="button"/>
                        <input type="button" value="-" onClick={e=> setValue(value + e.target.value)} className="button"/>
                    </div>
                    <div id="row-5">
                        <input type="button" value="00" onClick={e=> setValue(value + e.target.value)} className="button" id="zero-zero"/>
                        <input type="button" value="0" onClick={e=> setValue(value + e.target.value)} id="zero" className="button"/>
                        <input type="button" value="=" id="equal" onClick={e=> setValue(eval(value))} className="button"/>  
                    </div>
                </form>
            </div>
        </div>
    )
}

export default App