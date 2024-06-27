require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./Routes/v1')
const cors = require('cors');
const db_url = process.env.DB_URL;
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/v1', routes)

async function connect()
{
    mongoose.connect(db_url).then(()=>
    {
        console.log('DB connected successfully');
        app.listen(port, () =>
        {
            console.log(`Server running on port ${port}`);
        })      
    })
}

connect();

