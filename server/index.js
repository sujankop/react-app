const express = require('express');
const bodyParser = require('body-parser');

const app=express();



const userRoute=require('./routes/userroute');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

// app.use('/api/user',userRoute);

app.use('/api/user',userRoute)

const port=process.env.PORT||5000;
app.listen(port);