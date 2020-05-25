var request = require('request');
const teachingLavbicAPIUrl = 'https://teaching.lavbic.net/api';
var drugaBaza = require("../models/db2");
const Podjetje = drugaBaza.model("Podjetje");
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
        Podjetje.find({})
            .exec(napakaIzbrisa => {
                if (napakaIzbrisa) {
                    return res.status(500).json({odgovor: napakaIzbrisa});
                }
                const danes = new Date();
                const danesDatum = new Date(danes.getFullYear(), danes.getMonth(), danes.getDate());
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
                        Podjetje.findOneAndUpdate({"ime": zapis.ime})
                            .exec((napaka, podjetje) => {
                                if (!podjetje) {
                                    Podjetje.create(zapis);
                                }
                                podjetje.simbol = zapis.simbol;
                                podjetje.sektor = zapis.sektor;
                                podjetje.valuta = zapis.valuta;
                            });
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
                for (let index in podjetje.seznamZgodovinskihPodatkov) {
                    if (podjetje.seznamZgodovinskihPodatkov.hasOwnProperty(index)) {
                        if (podjetje.seznamZgodovinskihPodatkov[index].datum > req.query.zacetek && podjetje.seznamZgodovinskihPodatkov[index].datum <= req.query.konec) {
                            zgodovinskiPodatkiMap.push(podjetje.seznamZgodovinskihPodatkov[index]);
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