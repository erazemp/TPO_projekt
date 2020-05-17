var request = require('request');
const teachingLavbicAPIUrl = 'https://teaching.lavbic.net/api';

var Podjetje = require('../models/shema-podjetja');

let datumZadnjeOsvezitve = null;

const pridobiPodjetjeNaBorzi = (req, res) => {
    const danes = new Date();
    const danesDatum = new Date(danes.getFullYear(), danes.getMonth(), danes.getDate());
    if (datumZadnjeOsvezitve == null) {
        // poizveduj API
        console.log('API klic');
        datumZadnjeOsvezitve = danesDatum;
        request(teachingLavbicAPIUrl + '/finance/delnice/seznam', function (napaka, odgovor, body) {
            Podjetje.find({}).deleteMany({})
                .exec(napakaIzbrisa => {
                    if (napakaIzbrisa) {
                        return res.status(500).json({odgovor: napakaIzbrisa});
                    }
                    var jsonTabela = JSON.parse(body);
                    for (let key in jsonTabela) {
                        if (jsonTabela.hasOwnProperty(key)) {
                            Podjetje.create({
                                ime: jsonTabela[key].podjetje,
                                simbol: jsonTabela[key].simbol,
                                sektor: jsonTabela[key].sektor,
                                valuta: jsonTabela[key].valuta
                            });
                        }
                    }
                })
        });
        // }).pipe(res);
    }
    if (danesDatum.getTime() !== datumZadnjeOsvezitve.getTime()) {
        // poizveduj API
        console.log('API klic');
        datumZadnjeOsvezitve = danesDatum;
        request(teachingLavbicAPIUrl + '/finance/delnice/seznam', function (napaka, odgovor, body) {
            Podjetje.find({}).deleteMany({})
                .exec(napakaIzbrisa => {
                    if (napakaIzbrisa) {
                        return res.status(500).json({odgovor: napakaIzbrisa});
                    }
                    var jsonTabela = JSON.parse(body);
                    for (let key in jsonTabela) {
                        if (jsonTabela.hasOwnProperty(key)) {
                            Podjetje.create({
                                ime: jsonTabela[key].podjetje,
                                simbol: jsonTabela[key].simbol,
                                sektor: jsonTabela[key].sektor,
                                valuta: jsonTabela[key].valuta
                            });
                        }
                    }
                })
        });
    }
    Podjetje.find({}, function (err, podjetja) {
        var podjetjaMap = [];
        podjetja.forEach(function (podjetje) {
            podjetjaMap.push(podjetje);
        });
        res.send(podjetjaMap);
    })
    // res.status(200).json({odgovor: 'datum je enak danasnjemu, samo poizveduj preko baze'});
};

module.exports = {
    pridobiPodjetjeNaBorzi
};