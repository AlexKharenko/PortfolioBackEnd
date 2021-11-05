const express = require('express');

const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;
const address = process.env.ADDRESS || '0.0.0.0';

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, address, () => {
  console.log(`App listening on port http://${address}:${port}`);
});
