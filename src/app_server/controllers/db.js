const mongoose = require('mongoose');
const Uporabnik = mongoose.model('Uporabnik');
const drugaBaza = require('../models/db2');
var Podjetje = drugaBaza.model('Podjetje');

var vstavi = (req, res) => {
    Uporabnik.find({}).deleteMany({})
        .exec(napaka => {
            if (napaka) {
                return res.status(500).json({"Napaka": napaka});
            }
            Uporabnik.create({
                "uporabniskoIme": "alko",
                "ocena": "2",
                "denar": 14,
                "email": 'aljaz@gmail.com',
                "ime": "Aljaz",
                "priimek": "Smaljcelj",
                "zgoscenaVrednost": "4466834d0e6da5314ab42e98678d46dae14e7364f8acad48f904022276b68a738fbdfc582ed6b321ac0fb6745479bd59cc52b9ca7314c98e74069364e5b99928",
                "nakljucnaVrednost": "7a3e3c170bdbdc1ae5141ccf141ff6be",
                "geslo": "geslo"
            });
            Uporabnik.create({
                "uporabniskoIme": "lavbo",
                "ocena": "2",
                "denar": 14,
                "email": 'lavbo@gmail.com',
                "ime": "Lavbo",
                "priimek": "Kralj",
                "zgoscenaVrednost": "4466834d0e6da5314ab42e98678d46dae14e7364f8acad48f904022276b68a738fbdfc582ed6b321ac0fb6745479bd59cc52b9ca7314c98e74069364e5b99928",
                "nakljucnaVrednost": "7a3e3c170bdbdc1ae5141ccf141ff6be",
                "geslo": "geslo"
            });
        });

    Podjetje.find({}).deleteMany({})
        .exec(napaka => {
            if (napaka) {
                return res.status(500).json(napaka);
            }
            Podjetje.create({
                "ime": "test",
                "simbol": "T",
                "sektor": "S",
                "valuta": "Euro",
                "datumPosodobitveZgodovinskihPodatkov": null
            });
        })
};

var izbrisi = (req, res) => {
    Uporabnik.find({}).deleteMany({})
        .exec(napaka => {
            if (napaka) {
                return res.status(500).json(napaka);
            }
        });

    Podjetje.find({}).deleteMany({})
        .exec(napaka => {
            if (napaka) {
                return res.status(500).json(napaka);
            }
        });

    res.status(200).json({obvestilo: "Uspesen izbris"});
};

module.exports = {
    vstavi,
    izbrisi
};