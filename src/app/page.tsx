"use client" // this is necesary to add if user will be interacting with the page.
import {useState, useEffect} from "react"; // importing necessary hiiks from React like useState to be able to change the state of the components and useEffect to store data/

// importing pages created by me
// import styles from "./page.module.css";
import '../../styles/tableStyles.css';
import MoneyInput from "../components/MoneyInput";
import SavingInput from "@/components/SavingInput";
import Calculator from "../components/Calculator";


// Defaning an interfac for the data structure:
interface purposeAmount {
  purpose: string; // this represents the purpose of the money
  amount: number; // this rperesents the amount of money
}


export default function Home() {
  // varibales whose values may be changed by the user so they are using useState
  const [moneyIn, setMoneyIn] = useState<purposeAmount[]>([]);
  const [moneyOut, setMoneyOut] = useState<purposeAmount[]>([]);
  const [savingGoal, setSavingGoal] = useState<purposeAmount[]>([]);


 // loads data from local storage on component 
  useEffect(() => {
    const storedMoneyIn = localStorage.getItem("moneyIn"); // get moneyIn value from local strg
    const storedMoneyOut = localStorage.getItem("moneyOut");// get moneyPut value from local strg
    const storedSavingGoal = localStorage.getItem("savingGoal"); // get saving goal value from local strg
  
    // if the data exists get that information
    if(storedMoneyIn) setMoneyIn(JSON.parse(storedMoneyIn)); 
    if(storedMoneyOut) setMoneyOut(JSON.parse(storedMoneyOut)); 
    if(storedSavingGoal) setSavingGoal(JSON.parse(storedSavingGoal));
  }, []); // the array is empty si that it runs once after the initial lioading


  // save the data to local storage
  useEffect(() => {
    localStorage.setItem("moneyIn", JSON.stringify(moneyIn));
    localStorage.setItem("moneyOut", JSON.stringify(moneyOut));
    localStorage.setItem("savingGoal", JSON.stringify(savingGoal));
  }, [moneyIn, moneyOut, savingGoal]);

  const totalMoneyIn = moneyIn.reduce((sum, entry) => sum + entry.amount, 0);
  const totalMoneyOut = moneyOut.reduce((sum, entry) => sum + entry.amount, 0);
  const totalSavings = savingGoal.reduce((sum, entry) => sum + entry.amount, 0);
  const netWorth = totalMoneyIn - totalMoneyOut + totalSavings;

  return (
    <div id="mainDiv" >

        <h1 id="appName">Welcome to your money tracker!</h1>

        <div className="main-row">
        <h1 id="net-worth">Net Worth: ${netWorth.toFixed(2)}</h1>
          <div className="column-1">
            <MoneyInput title="Money In" history={moneyIn} onAdd={(entry)=> setMoneyIn([entry, ...moneyIn])}></MoneyInput>
          </div>

        <div className="column-2">
          <MoneyInput title="Money Out" history={moneyOut} onAdd={(entry)=> setMoneyOut([entry, ...moneyOut])}></MoneyInput>
        </div>
        <div className="column-3">
          <SavingInput title="Saving Goal" history={savingGoal} onAdd={(entry)=> setSavingGoal([entry, ...savingGoal])}></SavingInput>
        </div>

        
        </div>

        <div className="calculator">
          <Calculator></Calculator>
        </div>
    </div>
    
  );
}
