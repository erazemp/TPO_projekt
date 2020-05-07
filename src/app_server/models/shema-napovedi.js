const mongoose = require('mongoose');

const napovediShema = new mongoose.Schema({
    high: {type:Number, required: true},
    low: {type:Number, required: true}
});

mongoose.model('Napoved', napovediShema, 'Napovedi');