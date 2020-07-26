const express = require('express');
const    http = require('http');

const hostname = 'localhost';
const port = 3000;

const app = express();

const bodyParser = require('body-parser');



app.use(bodyParser.json());
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);



const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});