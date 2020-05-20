const mongoose = require('mongoose');
const drugaBaza = require('./db2');

const zgodovinskiPodatkiShema = new mongoose.Schema({
    datum: {type:String, required: true},
    open: {type:Number, required: true},
    high: {type:Number, required: true},
    low: {type:Number, required: true},
    close: {type:Number, required: true},
    volume: {type:Number, required: true},
    adjusted: {type:Number, required: true}
});

const podjetjaShema = new mongoose.Schema({
    ime: {type: String, required: true},
    simbol: {type: String, required: true},
    sektor: {type: String, required: true},
    valuta: {type: String, required: true},
    datumPosodobitveZgodovinskihPodatkov: {type: Date},
    seznamZgodovinskihPodatkov: [zgodovinskiPodatkiShema]
});

drugaBaza.model('Podjetje', podjetjaShema, 'Podjetja');
module.exports = drugaBaza.model('Podjetje', podjetjaShema);