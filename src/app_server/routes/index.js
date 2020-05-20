var express = require('express');
var ctrlApiUporabniki = require('../controllers/uporabniki');
var router = express.Router();
// var ctrlNapovedi = require('../controllers/napovedi');
var ctrlAvtentikacija = require('../controllers/avtentikacija');
var ctrlUporabniki = require('../controllers/uporabniki');
var ctrlDb = require('../controllers/db');
var ctrlDomacaStran = require('../controllers/domaca-stran');

/* Izpiši sporocilo o zahtevi po domaci strani */
router.get('/hello-world', function (req, res) {
    res.status(200).json({
        "odgovor": "Povezava uspesna"
    });
});

// router.get('/napovedi', ctrlNapovedi.vrniNapovedi);

// avtentikacija
router.post('/registracija', ctrlAvtentikacija.registracija);
router.post('/prijava', ctrlAvtentikacija.prijava);

// uporabnik
router.route('/uporabniki/:idUporabnika')
    //pridobi uporabnika GET
    .get(ctrlApiUporabniki.pridobiUporabnika)
    .put(ctrlApiUporabniki.posodobiUporabnika);
router.get('/uporabniki', ctrlUporabniki.vrniUporabnike);
router.delete('/uporabniki/:idUporabnika', ctrlUporabniki.izbrisiUporabnika);

// testni vnos podatkov
router.delete('/db/izbrisi', ctrlDb.izbrisi);
router.post('/db/vstavi', ctrlDb.vstavi);

// domaca stran
router.get('/domaca-stran', ctrlDomacaStran.pridobiPodjetjeNaBorzi);
router.get('/delnice/:simbol', ctrlDomacaStran.pridobiZgodovinskePodatke);

module.exports = router;
