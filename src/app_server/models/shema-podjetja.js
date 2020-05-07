const mongoose = require('mongoose');
const ZgodovinskiPodatek = require('./shema-zgodovinski-podatki.js');

const podjetjaShema = new mongoose.Schema({
    ime: {type: String, required: true},
    simbol: {type: String, required: true},
    sektor: {type: String, required: true},
    valuta: {type: String, required: true},
    seznamZgodovinskihPodatkov: [{ type:mongoose.Schema.Types.ObjectId, ref: 'ZgodovinskiPodatek'}]
});

mongoose.model('Podjetje', podjetjaShema, 'Podjetja');
module.exports = mongoose.model('Podjetje', podjetjaShema);