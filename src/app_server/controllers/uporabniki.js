var mongoose = require("mongoose");

var Uporabnik = require('../models/shema-uporabniki');

var pridobiUporabnika = function(req,res){
    //vrnemo seznam vseh dogodkov
    var idUporab = req.params.idUporabnika;
    console.log("Pridobi Uporabnika uporabnik.js "+ idUporab);
    Uporabnik.findById(idUporab,function(err,uporabnik){
        if(err){
            console.log("Pridobi uporabnika Err " + uporabnik);
            console.log(err);
            res.status(500).json({"sporočilo":"Napaka z odgovorom: "+err});
        }else{
            console.log("Pridobi uporabnika else " + uporabnik);
            res.status(200).json(uporabnik);
        }
    });
};

var posodobiUporabnika = function(req,res){
    var id = req.params.idUporabnika;
    var posodobljenUporabnik = {
        uporabniskoIme:req.body.uporabniskoIme,
        email:req.body.email
    };
    Uporabnik.findByIdAndUpdate(id,posodobljenUporabnik,function(err,el){
        if(err){
            res.status(400).json({'sporočilo':'Napaka z odgovorom: '+err});
        }else{
            res.status(200).json(el);
        }
    });
};
/*
var posodobiDatumPrijave = function(req,res){
    var id = req.params.idUporabnika;
    var posodobljenUporabnik = {
        datumPrijave:req.body.datum,
    };
    Uporabnik.findByIdAndUpdate(id,posodobljenUporabnik,function(err,el){
        if(err){
            res.status(400).json({'sporočilo':'Napaka z odgovorom: '+err});
        }else{
            res.status(200).json(el);
        }
    });
};
*/

const vrniUporabnike = (req, res) => {
    Uporabnik.find({}, function(err, uporabniki) {
        var uporabnikiMap = [];
        uporabniki.forEach(function (uporabnik) {
            uporabnikiMap.push(uporabnik);
        });
        res.send(uporabnikiMap);
    })
};

const izbrisiUporabnika = (req, res) => {
    Uporabnik.findByIdAndDelete(req.params.idUporabnika)
        .exec((napaka) => {
            if (napaka) {
                return res.status(500).json(napaka);
            }
            return res.status(204).json(null);
        });
};

module.exports = {
    vrniUporabnike,
    pridobiUporabnika,
    posodobiUporabnika,
<<<<<<< Updated upstream
    izbrisiUporabnika
=======
    //posodobiDatumPrijave
>>>>>>> Stashed changes
};