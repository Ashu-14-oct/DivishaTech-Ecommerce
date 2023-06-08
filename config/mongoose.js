const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Divisha');

const db = mongoose.connection;

db.once('open', (err)=>{
    if(err){
        console.log(err);
        return;
    }

    console.log('database successfully connected to the server');
});

module.exports = db;