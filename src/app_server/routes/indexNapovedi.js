var express = require('express');
var router = express.Router();
const ctrlNapovedi = require('../napovedi/napovedAPI');

router.get('/hello-world', function (req, res) {
    res.status(200).json({
        odgovor: "povezava uspesna"
    })
});

router.post('/napovedi', function (req, res) {
    res.status(200).json(ctrlNapovedi(req.body));
});

module.exports = router;