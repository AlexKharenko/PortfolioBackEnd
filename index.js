require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3000;
const address = process.env.ADDRESS || '0.0.0.0';

const app = express();

const corsOptions = {
  origin: `http://${address}:${port}`,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

const authRouter = require('./src/routes/auth');
const worksRouter = require('./src/routes/works');
const profileRouter = require('./src/routes/profile');

app.use('/', authRouter);
// app.use('/works', worksRouter);
// app.use('/profile', profileRouter);

app.listen(port, address, () => {
  console.log(`App listening on port http://${address}:${port}`);
});
