
import { useState } from "react";

function RandomGenerator() {
  const [number, setNumber] = useState(null);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [history, setHistory] = useState([]);

  const validRange =
    Number.isInteger(min) &&
    Number.isInteger(max) &&
    min < max;

  const generateNumber = () => {
    if (!validRange) return;

    let newNumber;

    do {
      newNumber =
        Math.floor(Math.random() * (max - min + 1)) + min;
    } while (
      newNumber === number &&
      max - min >= 1
    );

    setNumber(newNumber);
    setHistory(prev =>
      [newNumber, ...prev].slice(0, 5)
    );
  };

  const getMessage = () => {
    if (number === null)
      return "💎 No number generated yet";

    if (number % 2 === 0)
      return " An even number has appeared!";

    return " An odd number has appeared!";
  };

  return (
    <main className="randora-card">
      <header className="header">
        <div className="brand-icon">🎲</div>

        <div className="brand">
          <h1>Randora<span>✦</span></h1>
          <p>The Random Number Universe</p>
        </div>

        
      </header>

      <section className="generator-panel">
        <h2>✦ Your Mystery Number ✦</h2>

        <div className="crystal">
          <span key={number}>
            {number === null ? "?" : number}
          </span>
        </div>

        <p className="status" aria-live="polite">
          {getMessage()}
        </p>

        <div className="range-controls">
          <label>
            From
            <input
              type="number"
              value={min}
              onChange={e =>
                setMin(e.target.value === ""
                  ? "" : Number(e.target.value))
              }
            />
          </label>

          <span className="range-icon">⇄</span>

          <label>
            To
            <input
              type="number"
              value={max}
              onChange={e =>
                setMax(e.target.value === ""
                  ? "" : Number(e.target.value))
              }
            />
          </label>
        </div>

        {!validRange && (
          <p className="error">
            Enter whole numbers with From less than To.
          </p>
        )}

        <button
          className="generate-btn"
          onClick={generateNumber}
          disabled={!validRange}
        >
          🎲 Generate Random Number
        </button>
      </section>

      <section className="history-panel">
        <div className="history-heading">
          <h3>✧ Recent Discoveries</h3>
          <span>Last 5 numbers</span>
        </div>

        <div className="history-list">
          {Array.from({ length: 5 }, (_, index) => (
            <div className="history-item" key={index}>
              {history[index] ?? "—"}
            </div>
          ))}
        </div>
      </section>

      <footer>
        Crafted with React & a little magic 
      </footer>
    </main>
  );
}

export default RandomGenerator;
