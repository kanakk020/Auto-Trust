const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/contracts', require('./routes/contractRoutes'));

// Simple route to check if backend is running in browser
app.get('/', (req, res) => {
  res.send('<h2>Auto Trust Backend Status: <span style="color: green;">Online & Running!</span></h2>');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
