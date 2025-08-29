const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const { connectToMongo } = require('./models/db');
const stipendRoutes = require('./routes/StipendRoutes');
const masterRoutes = require('./routes/MasterRoutes');
const pgmedicalRoutes =require('./routes/PgMedicalRoutes');
const bptRoutes = require('./routes/BPTRoutes');

const app = express();

// Middleware
const allowedOrigins = ['http://localhost', 'http://localhost:3000',];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json()); // to parse JSON bodies

app.use('/api/stipend', stipendRoutes);
app.use('/api/master', masterRoutes);
app.use('/api/pgmedical', pgmedicalRoutes);
app.use('/api/bpt', bptRoutes);

app.use('/', (req, res) => { 
    res.send('API is working');
});


app.listen(process.env.PORT, '0.0.0.0', async () => {
       await connectToMongo();
    console.log(`Server is Running Successfully on Port ${process.env.PORT}`);
});