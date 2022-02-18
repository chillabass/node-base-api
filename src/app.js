// const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 3000;
const userRouter = require('./UserRouter').router;

const urlencodedParser = express.urlencoded({extended: false});
const rawParser = express.raw();
const jsonParser = express.json();

app.use(urlencodedParser, rawParser, jsonParser);
app.use('/users', userRouter);

//app.post('/', (req, res) => res.)

app.listen(PORT, () => {
  console.log(`server started on port = ${PORT}`);
});