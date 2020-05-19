var request = require('request');
const teachingLavbicAPIUrl = 'https://teaching.lavbic.net/api';
var Podjetje = require('../models/shema-podjetja');
let datumZadnjeOsvezitveSeznamaDelnic = null;

const pridobiPodjetjeNaBorzi = (req, res) => {
    const danes = new Date();
    const danesDatum = new Date(danes.getFullYear(), danes.getMonth(), danes.getDate());
    if (datumZadnjeOsvezitveSeznamaDelnic == null) {
        datumZadnjeOsvezitveSeznamaDelnic = danesDatum;
        apiKlicZaSeznamDelnic(res);
        return;
    }
    if (danesDatum.getTime() !== datumZadnjeOsvezitveSeznamaDelnic.getTime()) {
        datumZadnjeOsvezitveSeznamaDelnic = danesDatum;
        apiKlicZaSeznamDelnic(res);
        return;
    }
    Podjetje.find({}, function (err, podjetja) {
        var podjetjaMap = [];
        podjetja.forEach(function (podjetje) {
            podjetjaMap.push(podjetje);
        });
        res.send(podjetjaMap);
    })
};

const apiKlicZaSeznamDelnic = (res) => {
    console.log('API klic za seznam delnic');

    request(teachingLavbicAPIUrl + '/finance/delnice/seznam', function (napaka, odgovor, body) {
        Podjetje.find({}).deleteMany({})
            .exec(napakaIzbrisa => {
                if (napakaIzbrisa) {
                    return res.status(500).json({odgovor: napakaIzbrisa});
                }
                var jsonTabela = JSON.parse(body);
                var odgovor = [];
                for (let key in jsonTabela) {
                    if (jsonTabela.hasOwnProperty(key)) {
                        var zapis = {
                            ime: jsonTabela[key].podjetje,
                            simbol: jsonTabela[key].simbol,
                            sektor: jsonTabela[key].sektor,
                            valuta: jsonTabela[key].valuta,
                            datumPosodobitveZgodovinskihPodatkov: null
                        };
                        odgovor.push(zapis);
                        Podjetje.create(zapis);
                    }
                }
                res.send(odgovor);
            })
    });
};

const pridobiZgodovinskePodatke = (req, res) => {
    const danes = new Date();
    const danesDatum = new Date(danes.getFullYear(), danes.getMonth(), danes.getDate());
    Podjetje.findOne({simbol: req.params.simbol})
        .exec((napaka, podjetje) => {
            if (!podjetje) {
                return res.status(404).json({odgovor: "ne najdem podjetja"});
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            const datumSpremembe = new Date(podjetje.datumPosodobitveZgodovinskihPodatkov);
            if (danesDatum.getTime() !== datumSpremembe.getTime()) {
                const options = {
                    url: teachingLavbicAPIUrl + '/finance/delnice/cene/' + req.params.simbol,
                    qs: {
                        zacetek: req.query.zacetek,
                        konec: req.query.konec
                    }
                };
                request(options, function (napaka, odgovor, body) {
                    console.log('API klic za pridobitev zgodovinskih podatkov delnice ' + req.params.simbol);
                    if (napaka) {
                        return res.status(500).json(napaka);
                    }
                    var jsonTabela = JSON.parse(body);
                    for (let key in jsonTabela) {
                        if (jsonTabela.hasOwnProperty(key)) {
                            podjetje.seznamZgodovinskihPodatkov.push({
                                datum: jsonTabela[key].date,
                                open: parseFloat(jsonTabela[key].open),
                                high: parseFloat(jsonTabela[key].high),
                                low: parseFloat(jsonTabela[key].low),
                                close: parseFloat(jsonTabela[key].close),
                                volume: parseFloat(jsonTabela[key].volume),
                                adjusted: parseFloat(jsonTabela[key].adjusted)
                            });
                        }
                    }
                    podjetje.datumPosodobitveZgodovinskihPodatkov = danesDatum;
                    res.send(podjetje.seznamZgodovinskihPodatkov);
                    podjetje.save();
                });
            } else {
                var zgodovinskiPodatkiMap = [];
                for (let zgodovinskiPodatek in podjetje.seznamZgodovinskihPodatkov) {
                    if (podjetje.seznamZgodovinskihPodatkov.hasOwnProperty(zgodovinskiPodatek)) {
                        if (zgodovinskiPodatek.datum > req.query.zacetek && zgodovinskiPodatek.datum <= req.query.konec) {
                            zgodovinskiPodatkiMap.push(zgodovinskiPodatek);
                        }
                    }
                }
                res.send(zgodovinskiPodatkiMap);
            }
        })
};

module.exports = {
    pridobiPodjetjeNaBorzi,
    pridobiZgodovinskePodatke
};