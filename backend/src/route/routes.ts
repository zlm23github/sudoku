import express from 'express';
import SudokuGenerator from '../component/sudokuGenerator';

const router = express.Router();
const sudokuGenerator = new SudokuGenerator();

// get sudoku puzzle
router.get('/sudoku', (req, res) => {
  const puzzle = sudokuGenerator.createPuzzle();
  res.json({ puzzle });
});

// validate sudoku
router.post('/solve', (req, res) => {
  const puzzle = req.body.puzzle;
  const isValid = sudokuGenerator.validatePuzzle(puzzle);
  res.json({ isValid });
});

// test route
router.get('/test', (req, res) => {
  res.json({ message: 'ok' });
});

export default router;