const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const cookieParser = require('cookie-parser');
const path = require("path");

const { connectToMongo } = require('./models/db');
const stipendRoutes = require('./routes/StipendRoutes');
const masterRoutes = require('./routes/MasterRoutes');
const pgmedicalRoutes =require('./routes/PgMedicalRoutes');
const bptRoutes = require('./routes/BPTRoutes');
const loginRoutes =require('./routes/LoginRoutes');
const certificateRoutes = require('./routes/CertificateRoute');
const checkerRoutes = require ('./routes/CheckerRoutes');
const fileRoutes = require('./routes/FileRoutes');
const reportRoutes = require('./routes/ReportRoute');

const app = express();

app.use(cookieParser());
// Middleware
const allowedOrigins = ['http://localhost', 'http://localhost:3000', 
  'http://172.25.4.79:3000', 'http://172.26.0.50:3000', 'http://172.26.0.50'];

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

app.use("/media", express.static(path.join(__dirname, "media")));

//
app.use('/api/stipend', stipendRoutes);
app.use('/api/master', masterRoutes);
app.use('/api/pgmedical', pgmedicalRoutes);
app.use('/api/bpt', bptRoutes);
app.use('/api/user', loginRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/checker', checkerRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/report', reportRoutes);

app.use('/', (req, res) => { 
    res.send('API is working');
});


app.listen(process.env.PORT, '0.0.0.0', async () => {
    console.log(`Server is Running Successfully on Port ${process.env.PORT}`);
});
