const request = require('request');
const mongoose = require('mongoose');
const Bot = mongoose.model('TrgovalniBot');
const Napoved = mongoose.model('Napoved');
const drugaBaza = require("../models/db2");
const Podjetje = drugaBaza.model('Podjetje');
const zadrziDelnico = require('../controllers/zadrziDelnico');
const kupiDelnico = require('../controllers/kupiDelnico');
const prodajDelnico = require('../controllers/prodajDelnico');

const sproziTrgovanje = () => {
    console.log('sprozi trgovanje');
    Bot.find({})
        .exec((napaka, boti) => {
            if (napaka) {
                return;
            }
            for (let i in boti) {
                if (boti.hasOwnProperty(i)) {
                    if (boti[i].zagnan) {
                        console.log('ok');
                        odlociSe(boti[i]);
                    }
                }
            }
        });
};

const posodobiNapovedi = () => {
    console.log('posodobi napovedi');
    Podjetje.find({})
        .exec((napaka, podjetja) => {
            if (napaka)
                return;
            Napoved.deleteMany({});
            for (let i in podjetja) {
                if (podjetja.hasOwnProperty(i)) {
                    console.log(podjetja[i]);
                    const options = {
                        url: 'http://localhost:3000/api-napovedi/napovedi',
                        json: true,
                        body: podjetja[i].zgodovinskiPodatki,
                        method: "POST",
                    };
                    request(options, function (napaka, odgovor, body) {
                            const high = body.high;
                            const low = body.low;
                            Napoved.create({
                                "simbol_podjetja": podjetja[i].simbol,
                                "high": high,
                                "low": low
                            });
                        }
                    );
                }
            }
        });
};

const odlociSe = (bot) => {
    for (let i in bot.seznamPodjetij) {
        if (bot.seznamPodjetij.hasOwnProperty(i)) {
            Napoved.findOne({simbol_podjetja: bot.seznamPodjetij[i]})
                .exec((napaka, napoved) => {
                    if (napaka)
                        return napaka;
                    const high = napoved.high;
                    const low = napoved.low;
                    if (high > low)
                        kupiDelnico(bot, bot.seznamPodjetij[i]);
                    else if (low > high)
                        prodajDelnico(bot, bot.seznamPodjetij[i]);
                    else
                        zadrziDelnico(bot, bot.seznamPodjetij[i]);
                });
        }
    }
};

const aktivirajBote = (req, res) => {
    console.log(req.body);
    Bot.findByIdAndUpdate({_id: req.body._id}, {zagnan: true}, (napaka, bot) => {
        if (napaka) {
            res.status(500).json(napaka);
        }
    })
};

module.exports = {
    odlociSe,
    aktivirajBote,
    posodobiNapovedi,
    sproziTrgovanje
};