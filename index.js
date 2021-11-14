require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;
const address = process.env.ADDRESS || '0.0.0.0';

const app = express();

const corsOptions = {
  credentials: true,
  origin: [`http://${address}:${port}`, process.env.FRONTEND_URL],
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

app.use(express.json());

const authRouter = require('./src/routes/auth');
const worksRouter = require('./src/routes/works');
const profileRouter = require('./src/routes/profile');

app.use('/', authRouter);
app.use('/works', worksRouter);
app.use('/profile', profileRouter);

app.listen(port, address, () => {
  console.log(`App listening on port http://${address}:${port}`);
});
