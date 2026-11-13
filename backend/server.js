
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const phimRouter = require('./routes/phim');

app.use('/api/phim', phimRouter);

app.get('/', (req, res) => {
    res.send('Movie Management API is running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
