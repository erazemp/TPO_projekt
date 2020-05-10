var express = require('express');
var ctrlApiUporabniki = require('../controllers/uporabniki');
var router = express.Router();
var ctrlNapovedi = require('../controllers/napovedi');
var ctrlAvtentikacija = require('../controllers/avtentikacija');
var ctrlUporabniki = require('../controllers/uporabniki');
var ctrlDb = require('../controllers/db');

/* Izpiši sporocilo o zahtevi po domaci strani */
router.get('/hello-world', function (req, res) {
    res.status(200).json({
        "odgovor": "Povezava uspesna"
    });
});

router.get('/napovedi', ctrlNapovedi.vrniNapovedi);

router.post('/registracija', ctrlAvtentikacija.registracija);

router.post('/prijava', ctrlAvtentikacija.prijava);


router.route('/uporabniki/:idUporabnika')
    //pridobi uporabnika GET
    .get(ctrlApiUporabniki.pridobiUporabnika)
    .put(ctrlApiUporabniki.posodobiUporabnika);

//router.put('/datum/:idUporabnika', ctrlApiUporabniki.posodobiDatumPrijave);



router.get('/uporabniki', ctrlUporabniki.vrniUporabnike);

router.delete('/uporabniki/:idUporabnika', ctrlUporabniki.izbrisiUporabnika);

router.delete('/db/izbrisi', ctrlDb.izbrisi);
router.post('/db/vstavi', ctrlDb.vstavi);

module.exports = router;
