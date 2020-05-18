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
                        // Podjetje.create({
                        //     ime: jsonTabela[key].podjetje,
                        //     simbol: jsonTabela[key].simbol,
                        //     sektor: jsonTabela[key].sektor,
                        //     valuta: jsonTabela[key].valuta,
                        //     datumPosodobitveZgodovinskihPodatkov: null
                        // });
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
                // todo: dodaj se datum pri poizvedbi
                request(teachingLavbicAPIUrl + '/finance/delnice/cene/' + req.params.simbol + '?zacetek=2019-05-19&konec=2019-05-23', function (napaka, odgovor, body) {
                    console.log('API klic za pridobitev zgodovinskih podatkov delnice ' + req.params.simbol);
                    if (napaka) {
                        return res.status(500).json(napaka);
                    }
                    var jsonTabela = JSON.parse(body);
                    for (let key in jsonTabela) {
                        if (jsonTabela.hasOwnProperty(key)) {
                            podjetje.seznamZgodovinskihPodatkov.push({
                                datum: jsonTabela[key].date,
                                open: parseInt(jsonTabela[key].open),
                                high: parseInt(jsonTabela[key].high),
                                low: parseInt(jsonTabela[key].low),
                                close: parseInt(jsonTabela[key].close),
                                volume: parseInt(jsonTabela[key].volume),
                                adjusted: parseInt(jsonTabela[key].adjusted)
                            });
                        }
                    }
                    podjetje.datumPosodobitveZgodovinskihPodatkov = danesDatum;
                    res.send(podjetje.seznamZgodovinskihPodatkov);
                    podjetje.save();
                });
            } else {
                res.send(podjetje.seznamZgodovinskihPodatkov);
            }
        });
};

module.exports = {
    pridobiPodjetjeNaBorzi,
    pridobiZgodovinskePodatke
};