"use client";

import { useState } from "react";
import '../../styles/tableStyles.css'

interface PurposeAmount {
  purpose: string;
  amount: number;
}

interface SavingProps {
  title: string;
  history: PurposeAmount[];
  onAdd: (entry: PurposeAmount) => void;
  className?: string;
}

export default function SavingInput(props: SavingProps) {
  const [selectedGoal, setSelectedGoal] = useState<string>(""); // Selected goal
  const [newGoal, setNewGoal] = useState<string>(""); // Name of new goal
  const [amount, setAmount] = useState<string>(""); // Amount entered
  const [isOpen, setIsOpen] = useState(false); // Controls modal visibility
  const [error, setError] = useState(""); // Error messages

  

  // Group history by goal name
  const groupedGoals: Record<string, number[]> = {};
  props.history.forEach((entry) => {
    if (!groupedGoals[entry.purpose]) {
      groupedGoals[entry.purpose] = [];
    }
    groupedGoals[entry.purpose].push(entry.amount);
  });

  // change amount when event is receaved about 
  function amountChanger(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === "") {
      setAmount("");
    } else {
      const floatedValue = parseFloat(value);
      if (!isNaN(floatedValue) && floatedValue >= 0) {
        setAmount(value);
      }
    }
  }

  function submit() {
    if (!selectedGoal) {
      setError("Please select a goal");
      return;
    }

    if (selectedGoal === "New Goal" && newGoal.trim() === "") {
      setError("Please enter a goal name");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (parsedAmount <= 0 || isNaN(parsedAmount)) {
      setError("Please enter a valid amount");
      return;
    }

    const goalToSave = selectedGoal === "New Goal" ? newGoal : selectedGoal;

    props.onAdd({ purpose: goalToSave, amount: parsedAmount });

    // Reset fields
    setSelectedGoal("");
    setNewGoal("");
    setAmount("");
    setIsOpen(false);
    setError("");
  }

  return (
    <div className="column">
      <h2 className="category">{props.title}</h2>
      <h5 className="history">History</h5>

      <button onClick={() => setIsOpen(true)} className="addButtons">Add</button>

      {isOpen && (
        <div className="popUp">
          <div>
            <label className="innerTextLabel">Choose Goal:</label>
            <select value={selectedGoal} onChange={(e) => setSelectedGoal(e.target.value)}>
              <option value="">Select a goal</option>
              {Object.keys(groupedGoals).map((goal, index) => (
                <option key={index} value={goal}>{goal}</option>
              ))}
              <option value="New Goal">New Goal</option>
            </select>
          </div>

          {selectedGoal === "New Goal" && (
            <div>
              <label>Goal Name:</label>
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="innerTextLabel">Amount: $</label>
            <input
              type="text"
              value={amount}
              onChange={amountChanger}
            />
          </div>

          {error && <div style={{ color: "red" }}>{error}</div>}

          <div>
            <button onClick={() => setIsOpen(false)}>X</button>
            <button onClick={submit}>O</button>
          </div>
        </div>
      )}

      <hr />
      <ul className="outerUl">
        {Object.entries(groupedGoals).map(([goal, amounts], index) => (
          <div key={index}>
            <h4 id="eachGoal">Goal: {goal}</h4>
            <ul className="innerUl">
              {amounts.map((amt, i) => (
                <li key={i} className="liSavings">${amt}</li>
              ))}
            </ul>
           
          </div>
        ))}
      </ul>
      <hr />
    </div>
  );
}
