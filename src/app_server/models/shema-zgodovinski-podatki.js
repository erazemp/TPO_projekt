const mongoose = require('mongoose');

const zgodovinskiPodatkiShema = new mongoose.Schema({
    datum: {type:String, required: true},
    open: {type:Number, required: true},
    high: {type:Number, required: true},
    low: {type:Number, required: true},
    close: {type:Number, required: true},
    volume: {type:Number, required: true},
    adjusted: {type:Number, required: true}
});

mongoose.model('ZgodovinskiPodatek', zgodovinskiPodatkiShema, 'ZgodovisnkiPodatki');
module.exports = mongoose.model('ZgodovinskiPodatek', zgodovinskiPodatkiShema);