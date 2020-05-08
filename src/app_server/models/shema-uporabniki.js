const mongoose = require('mongoose');
//var TrgovalniBot = require('./shema-boti.js');

const uporabnikiShema = new mongoose.Schema({
    ocena: {type: Number, required: true},
    denar: {type: Number, required: true},
    uporabniskoIme: {type: String, required: true},
    geslo: {type: String, required: true},
    email: {type: String, required: true},
    ime: {type: String, required: true},
    priimek: {type: String, required: true},
    //seznamBotov: [{ type:mongoose.Schema.Types.ObjectId, ref: 'TrgovalniBot'}]
});

mongoose.model('Uporabnik', uporabnikiShema, 'Uporabniki');