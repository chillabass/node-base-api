const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require('./routers/UserRouter');

const urlencodedParser = express.urlencoded({extended: false});
const jsonParser = express.json();

app.use(urlencodedParser, jsonParser);
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`server started on port = ${PORT}`);
});