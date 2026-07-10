const express = require('express');
const helmet = require('helmet');
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
app.set('trust proxy', 1); // ← add this line immediately after
app.disable('x-powered-by');

app.use(helmet());
app.use((req, res, next) => {

    res.setHeader("X-Frame-Options", "DENY");

    res.setHeader("X-Content-Type-Options", "nosniff");

    res.setHeader(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=()"
    );

    res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, private"
    );

    res.setHeader(
        "Pragma",
        "no-cache"
    );
   res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none';");
    next();

});


app.use(cookieParser());
// Middleware
// const allowedOrigins = ['http://localhost', 'http://localhost:3000',
//   'http://172.25.4.79:3000', 'http://172.26.0.50:3000', 'http://172.26.0.50'];

  const allowedOrigins = [
  'http://localhost','http://localhost:3000','http://172.19.1.18:3000','http://10.10.175.59:3000','http://10.10.175.59',
  'http://172.25.4.79:3000','http://172.26.0.50:3000','http://172.26.0.50'
];
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
