const mongoose = require('mongoose');
const Uporabnik = mongoose.model('Uporabnik');
const Bot = mongoose.model('TrgovalniBot');
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
                "datumPrijave": new Date(),
                "email": 'aljaz@gmail.com',
                "ime": "Aljaz",
                "priimek": "Smaljcelj",
                "zgoscenaVrednost": "4466834d0e6da5314ab42e98678d46dae14e7364f8acad48f904022276b68a738fbdfc582ed6b321ac0fb6745479bd59cc52b9ca7314c98e74069364e5b99928",
                "nakljucnaVrednost": "7a3e3c170bdbdc1ae5141ccf141ff6be",
                "geslo": "geslo"
            });
            Uporabnik.create({
                "uporabniskoIme": "lavbo",
                "ocena": "4",
                "denar": 14,
                "datumPrijave": new Date(),
                "email": 'lavbo@gmail.com',
                "ime": "Lavbo",
                "priimek": "Kralj",
                "zgoscenaVrednost": "4466834d0e6da5314ab42e98678d46dae14e7364f8acad48f904022276b68a738fbdfc582ed6b321ac0fb6745479bd59cc52b9ca7314c98e74069364e5b99928",
                "nakljucnaVrednost": "7a3e3c170bdbdc1ae5141ccf141ff6be",
                "geslo": "geslo"
            });
        });
    Bot.find({}).deleteMany({})
        .exec(napaka => {
            if (napaka) {
                return res.status(500).json({"Napaka": napaka});
            }
            Bot.create({
                "ime": "Bot1",
                "opis": "Prvi testni bot",
                "kreator": "Mojster Botov1",
                "cena": 200,
                "parameterStevilaDelnic": 3,
                "parameterInvesticije": 2,
                "parameterNakupa": 7,
                "parameterProdaje": 4,
                "zagnan": false,
                "dobickonosnost": 0,
                "pridobljeniDenar": 0,
                "izgubljeniDenar": 0,
                "naprodaj": true
                //"seznamPodjetji": null
            });
            Bot.create({
                "ime": "Bot2",
                "opis": "Drugi testni bot",
                "kreator": "Mojster Botov2",
                "cena": 240,
                "parameterStevilaDelnic": 1,
                "parameterInvesticije": 1,
                "parameterNakupa": 3,
                "parameterProdaje": 2,
                "zagnan": false,
                "dobickonosnost": 0,
                "pridobljeniDenar": 0,
                "izgubljeniDenar": 0,
                "naprodaj": true
                //"seznamPodjetji": null
            });
            Bot.create({
                "ime": "Bot3",
                "opis": "Tretji MEGA testni bot",
                "kreator": "Mojster Botov3",
                "cena": 340,
                "parameterStevilaDelnic": 5,
                "parameterInvesticije": 2,
                "parameterNakupa": 5,
                "parameterProdaje": 5,
                "zagnan": false,
                "dobickonosnost": 0,
                "pridobljeniDenar": 0,
                "izgubljeniDenar": 0,
                "naprodaj": true
                //"seznamPodjetji": null
            });
        });
    res.status(200).json({obvestilo: "Uspešno dodani podatki"});
};

var izbrisi = (req, res) => {
    Uporabnik.find({}).deleteMany({})
        .exec(napaka => {
            if (napaka) {
                return res.status(500).json(napaka);
            }
        });

    Bot.find({}).deleteMany({})
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