import express from 'express';
import RateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import https from 'https';
import fs from 'fs';

import postRoutes from './routes/posts.js';
import usersRoutes from './routes/users.js';

const cert = fs.readFileSync('cert.pem', 'utf8');
const key = fs.readFileSync('key.pem', 'utf8');
var credentials = {key: key, cert: cert};

const app = express();

app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', usersRoutes);

// DoS attacks.
const limiter = new RateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 100, // limit of number of request per IP
    delayMs: 0 // disables delays
});
app.use(limiter);

// CSRF protection middleware.
// var csurf = require('csurf')
// var csrfProtection = csrf({ cookie: true })
// var parseForm = bodyParser.urlencoded({ extended: false })

//Render EJS Page
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'));
const httpsServer = https.createServer(credentials, app);

// Connect Database
const CONNECTION_URL = 'mongodb+srv://root:root123123@supweather.uo102.mongodb.net/supweather?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => httpsServer.listen(PORT, () => console.log(`✅ Database is synchronized!`+ ` Server Running on Port: https://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
mongoose.set('useFindAndModify', false);
