import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  /** This is the main application component controlling theme and rendering the UI. */
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /** Toggle between light and dark theme. */
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Simple TicTacToe board state: 9 cells
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  function handleClick(i) {
    if (board[i] || winner) return;
    const next = board.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setBoard(next);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <img src={logo} className="App-logo" alt="logo" />

        <p>Current theme: <strong>{theme}</strong></p>

        <div
          style={{
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 12,
            padding: 16,
            marginTop: 24,
            boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
          }}
          aria-label="Tic Tac Toe Game"
        >
          <div style={{ marginBottom: 12, fontWeight: 700 }}>{status}</div>
          <Board board={board} onClick={handleClick} />
          <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button
              onClick={() => {
                setBoard(Array(9).fill(null));
                setXIsNext(true);
              }}
              style={{
                background: 'var(--button-bg)',
                color: 'var(--button-text)',
                border: 'none',
                borderRadius: 8,
                padding: '8px 12px',
                cursor: 'pointer',
              }}
              aria-label="Restart game"
            >
              Restart
            </button>
          </div>
        </div>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: 16 }}
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// PUBLIC_INTERFACE
function Board({ board, onClick }) {
  /** Render a simple 3x3 tic-tac-toe board. */
  return (
    <div
      role="grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 80px)',
        gridTemplateRows: 'repeat(3, 80px)',
        gap: 8,
      }}
    >
      {board.map((cell, i) => (
        <button
          key={i}
          role="gridcell"
          aria-label={`Cell ${i + 1}${cell ? `, ${cell}` : ''}`}
          onClick={() => onClick(i)}
          style={{
            width: 80,
            height: 80,
            borderRadius: 10,
            border: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontSize: 28,
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'transform 0.1s ease, background 0.2s ease',
          }}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}

// Helper to calculate winner
function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (const [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
