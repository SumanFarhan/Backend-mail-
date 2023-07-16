const express = require('express');
const app = express();
const routes = require('./router/routes')
const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();

try {
    mongoose.connect('mongodb+srv://root:root@cluster0.jcmgrdj.mongodb.net/maildb',
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    )
} catch (error) {
    console.log('Error in DB connection');
}

process.on('UnhandledRejection', error => {
    console.log('DB error', error);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);

app.listen(3007, () => {
    console.log('Server running on port 3007');
});
