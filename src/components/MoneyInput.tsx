"use client";
import '../../styles/tableStyles.css'
import { useEffect, useState} from "react";


interface PurposeAmount {
  purpose: string;
  amount: number;
}

interface ColumnProps {
  title: string;
  history: PurposeAmount[];
  onAdd: (entry: PurposeAmount) => void;
  className? : string;
}

export default function MoneyInput(props: ColumnProps) {
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState<string>(""); // Keep as string for input handling
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const[inTotal, setInTotal] = useState(0);
  const[outTotal, setOutTotal] = useState(0);

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
    if (purpose === "") {
      setError("Please enter a purpose");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (parsedAmount <= 0 || isNaN(parsedAmount)) {
      setError("Please enter a valid positive amount");
      return;
    }

    


    const newEntry = { purpose, amount: parsedAmount };
    props.onAdd(newEntry);


    setPurpose("");
    setAmount(""); 
    setIsOpen(false);
    setError("");
  }


  function calculateTotal(){
    let inTotal = 0;
    let outTotal =0;
    props.history.forEach((entry) => {
      if(props.title.includes("In")){
        inTotal += entry.amount;
      } else if(props.title.includes("Out")){
        outTotal += entry.amount;
      }
    });
    setInTotal(inTotal);
    setOutTotal(outTotal);
  }

  useEffect(()=>{
    calculateTotal();
  }, [props.history, props.title]);


  return (
    <div className="column">
      <h2 className="category">{props.title}</h2>
      <h5 className="history">History</h5>

      <button onClick={() => setIsOpen(true)} className="addButtons">Add</button>

      {isOpen && (
        <div className="popUp">
          <div>
            <label className="innerTextLabel">Purpose: </label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              style={{
                borderColor: error && purpose === "" ? " rgb(25,0,25,1)" : "white",
              }}
            />
          </div>

          <div>
            <label className="innerTextLabel">Amount: $</label>
            <input
              type="text" // Changed to text to allow user input flexibility
              value={amount}
              onChange={amountChanger}
              style={{
                borderColor: error && (amount === "" || parseFloat(amount) <= 0)
                  ? " rgb(25,0,25,1)"
                  : "white",
              }}
            />
          </div>

          {error && <div style={{ color: " rgb(25,0,25,1)" }}>{error}</div>}

          <div>
            <button onClick={() => setIsOpen(false)}>X</button>
            <button onClick={submit}>O</button>
          </div>
        </div>
      )}

      <hr />
      <ul className='ul'>
        {props.history.map((entry, index) => (
          <li key={index} className='li'>
            {entry.purpose} - ${entry.amount}
          </li>
        ))}
      </ul>
      <hr />
      {props.title.includes("In") && (
        <div className='totalInAndOut'>
        <h5>Total In: +${inTotal}</h5>
      </div>
      )}
      {props.title.includes("Out") && (
      <div className='totalInAndOut'>
      <h5>Total Out: -${outTotal}</h5>
    </div>
      )}
      
    </div>
  );
}