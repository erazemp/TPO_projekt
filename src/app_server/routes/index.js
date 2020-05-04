var express = require('express');
var router = express.Router();

/* Izpiši sporocilo o zahtevi po domaci strani */
router.get('/hello-world', function (req, res) {
    res.status(200).json({
        "odgovor": "Povezava uspesna"
    });
});

module.exports = router;
