var express = require('express');
var router = express.Router();

router.get('/hello-world', function (req, res) {
    res.status(200).json({
        odgovor: "povezava uspesna"
    })
});

router.post('/napovedi', function (req, res) {
    res.status(200).json({odgovor: req.body.body});
});

module.exports = router;