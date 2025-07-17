const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const boardRouter = require('./routes/board');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// API 라우트
app.use('/api/board', boardRouter);

app.get('/', (req, res) => {
  res.send('Windsurf FX Node API 서버');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
