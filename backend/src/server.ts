import express from 'express';
import cors from 'cors';
import sudokuRoutes from './route/routes';

const app = express();
const port = 3001;

// middleware
app.use(cors());
app.use(express.json());


app.use('/api', sudokuRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 