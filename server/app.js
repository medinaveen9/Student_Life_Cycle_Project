const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const { connectToMongo } = require('./models/db');
const stipendRoutes = require('./routes/StipendRoutes');
const masterRoutes = require('./routes/MasterRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON bodies

app.use('/api/stipend', stipendRoutes);
app.use('/api/master', masterRoutes);

app.use('/', (req, res) => { 
    res.send('API is working');
});


app.listen(process.env.PORT, '0.0.0.0', async () => {
       await connectToMongo();
    console.log(`Server is Running Successfully on Port ${process.env.PORT}`);
});