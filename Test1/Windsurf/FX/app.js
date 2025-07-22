import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import boardRouter from './routes/board.js';
import fxRouter from './routes/fx.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// API 라우트
app.use('/api/board', boardRouter);
app.use('/api/v1/fx', fxRouter);

app.get('/', (req, res) => {
  res.send('Windsurf FX Node API 서버');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
