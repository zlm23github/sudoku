import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sudoku, setSudoku] = useState<number[][]>([]);
  const [initialSudoku, setInitialSudoku] = useState<number[][]>([]); // Store initial sudoku state
  const [userInput, setUserInput] = useState<boolean[][]>([]); // Track which cells are user input

  useEffect(() => {
    // Fetch sudoku puzzle from backend
    fetch('http://localhost:3001/api/sudoku')
      .then(res => res.json())
      .then(data => {
        setSudoku(data.puzzle);
        setInitialSudoku(data.puzzle);
        // Initialize userInput array with false values
        setUserInput(data.puzzle.map((row: number[]) => row.map(() => false)));
      });
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent, row: number, col: number) => {
    // Only prevent modification of initial numbers
    if (initialSudoku[row][col] !== 0 && !userInput[row][col]) {
      return;
    }

    const newSudoku = [...sudoku];
    const newUserInput = [...userInput];
    
    // Handle deletion
    if (e.key === 'Backspace' || e.key === 'Delete') {
      newSudoku[row][col] = 0;
      newUserInput[row][col] = false;
      setSudoku(newSudoku);
      setUserInput(newUserInput);
      return;
    }

    // Handle number input (1-9)
    if (e.key >= '1' && e.key <= '9') {
      newSudoku[row][col] = parseInt(e.key);
      newUserInput[row][col] = true;
      setSudoku(newSudoku);
      setUserInput(newUserInput);
    }
  };

  const handleSolve = () => {
    fetch('http://localhost:3001/api/solve', {
      method: 'POST',
      body: JSON.stringify({ puzzle: sudoku }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Sudoku solved!');
        } else {
          alert('Failed to solve Sudoku');
        }
      });
  };

  return (
    <div className="App">
      <h1>Sudoku</h1>
      <div className="sudoku-grid">
        {sudoku.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <div 
                key={j} 
                className={`cell ${initialSudoku[i][j] !== 0 && !userInput[i][j] ? 'initial' : ''}`}
                onKeyDown={(e) => handleKeyPress(e, i, j)}
                tabIndex={0}
              >
                {cell === 0 ? '' : cell}
              </div>
            ))}
          </div>
        ))}
        <button onClick={() => handleSolve()}>Solve</button>
      </div>
    </div>
  );
}

export default App;
