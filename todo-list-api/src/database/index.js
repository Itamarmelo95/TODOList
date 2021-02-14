const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todolist', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;



