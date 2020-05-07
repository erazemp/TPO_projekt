var express = require('express');
var router = express.Router();
var ctrlNapovedi = require('../contollers/napovedi');

/* Izpiši sporocilo o zahtevi po domaci strani */
router.get('/hello-world', function (req, res) {
    res.status(200).json({
        "odgovor": "Povezava uspesna"
    });
});

router.get('/napovedi', ctrlNapovedi.vrniNapovedi);

module.exports = router;
