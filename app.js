const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/auth')
const bodyParser = require('body-parser');

const app= express();
app.use(cors({
    origin: 'http://localhost:8080',  // Allow your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-auth-Token', 'Origin', 'Authorization'],
  }));
  
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/hospital', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => console.log ('connected to mongodb'))
.catch((err) => console.log('connection failed...', err)
)
app.use('/api/auth', routes);

app.listen(1000, () =>{
    console.log('server running on http://localhost:1000')
})