import express from 'express';
import cors from 'cors';
import SudokuGenerator from './component/sudokuGenerator';

const app = express();
const port = 3001;

// middleware
app.use(cors());
app.use(express.json());

const sudokuGenerator = new SudokuGenerator();

// Sudoku routes
app.get('/api/sudoku', (req, res) => {
  const puzzle = sudokuGenerator.createPuzzle();
  res.json({puzzle});
});

// test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 