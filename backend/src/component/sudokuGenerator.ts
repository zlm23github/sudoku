class SudokuGenerator {
    private readonly SIZE = 9;
    private readonly EMPTY = 0;

  // Generate a complete 9x9 Sudoku grid
  generateFullSudoku(): number[][] {
    //init
    const grid: number[][] = Array(this.SIZE).fill(null).map(()=>Array(this.SIZE).fill(this.EMPTY));
    // 1. Fill first row with random 1-9
    const firstRow = this.shuffleArray([1,2,3,4,5,6,7,8,9]);
    for(let i = 0; i < this.SIZE; i++){
        grid[0][i] = firstRow[i];
    }
    
    // 2. Use backtracking to fill remaining cells
    this.fillRemaining(grid, 0, 0);
    return grid;

  }

  private shuffleArray(array: number[]): number[] {
    return array.sort(() => Math.random() - 0.5);
  }

  private fillRemaining(grid: number[][], row: number, col: number): boolean {
    if(row === this.SIZE - 1 && col === this.SIZE){
        return true;
    }
    if(col === this.SIZE){
        row++;
        col = 0;
    }
    if(grid[row][col] !== this.EMPTY){
        return this.fillRemaining(grid, row, col + 1);
    }
    for(let num = 1; num <= this.SIZE; num++){
        if(this.isValid(grid, row, col, num)){
            grid[row][col] = num;
            if(this.fillRemaining(grid, row, col + 1)){
                return true;
            }
            grid[row][col] = this.EMPTY;
        }
    }
    return false;
  }


  // Validate if the current board follows Sudoku rules
  isValid(grid: number[][], row: number, col: number, num: number): boolean {
    // Check rows, columns
    for(let i = 0; i < this.SIZE; i++){
        if(grid[row][i] === num || grid[i][col] === num){
            return false;
        }
    }
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(grid[boxRow + i][boxCol + j] === num){
                return false;
            }
        }
    }
    // Pass all checks
    return true;
  }

  createPuzzle(): number[][] {
    //init 
    const grid = this.generateFullSudoku();

    // Remove 30% numbers
    const puzzle = grid.map(row => [...row]);
    const cellsToRemove = this.SIZE * this.SIZE * 0.3;
    let removed = 0;

    while(removed < cellsToRemove){
        const row = Math.floor(Math.random() * this.SIZE);
        const col = Math.floor(Math.random() * this.SIZE);
        if(puzzle[row][col] !== this.EMPTY){
            puzzle[row][col] = this.EMPTY;
            removed++;
        }
    }

    return puzzle;
  }


}


export default SudokuGenerator;