const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('../models/User');
const Car = require('../models/Car');
const RentedCarInfo = require('../models/RentedCarInfo')

module.exports = config => {
    mongoose.connect(config.dbPath, {
        useMongoClient: true
    });       
    const db = mongoose.connection;
    db.once('open', err => {                
        if (err) throw err;
        User.seedAdminUser().then(() => {
            console.log('Database Connection Estabilished....');                
        }).catch((reason) => {
            console.log('Oops! Something went wrong....');
            console.log(reason);
        });
    });
    db.on('error', reason => {
        console.log(reason);
    });
};