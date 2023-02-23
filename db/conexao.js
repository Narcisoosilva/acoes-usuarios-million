const mongoose = require('mongoose');
const uri = process.env.MONGO_URI ? process.env.MONGO_URI : 'mongodb://localhost:27017/acoes-usuarios-million';

mongoose.connect(uri, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

module.exports = mongoose;
