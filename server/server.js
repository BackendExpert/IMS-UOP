const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path'); 
const bodyParser = require('body-parser');



// routes

const ConnectDB = require('./Config/DB');

const authRoute = require('./route/authRoute')
const userRoute = require('./route/userRoute')
const projectRoute = require('./route/projectRoute')
const internRoute = require('./route/internRoute')
const supervisorRoute = require('./route/supervisorRoute')
const attendanceRoute = require('./route/attendanceRoute')

const app = express();
const PORT = process.env.PORT || 5000;

ConnectDB()


  
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/project', projectRoute)
app.use('/intern', internRoute)
app.use('/supervisor', supervisorRoute)
app.use('/attendance', attendanceRoute)

app.get('/', (req, res) => {
    res.send(`Server running on port ${PORT}`);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});