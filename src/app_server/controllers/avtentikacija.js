//const passport = require('passport');
const mongoose = require('mongoose');
const Uporabnik = mongoose.model('Uporabnik');

const registracija = (req, res) => {
    if (!req.body.uporabniskoIme || !req.body.geslo || !req.body.email || !req.body.ime || !req.body.priimek) {
        return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    }

    const uporabnik = new Uporabnik();
    uporabnik.ime = req.body.ime;
    uporabnik.priimek = req.body.priimek;
    uporabnik.email = req.body.email;
    uporabnik.uporabniskoIme = req.body.uporabniskoIme;
    uporabnik.ocena = req.body.ocena;
    uporabnik.denar = req.body.denar;
    uporabnik.nastaviGeslo(req.body.geslo);

    uporabnik.save(function(napaka) {
        if (napaka) {
            if (napaka.name == "MongoError" && napaka.code == 11000)
                res.status(409).json({"sporočilo": "Uporabnik že obstaja."});
            else
                res.status(500).json(napaka);
        } else {
            res.status(200).json({"žeton": uporabnik.generirajJwt()});
        }
    });
};

module.exports = {
    registracija
};