const mongoose = require('mongoose');
const Uporabnik = mongoose.model('Uporabnik');

const vrniUporabnike = (req, res) => {
    Uporabnik.find({}, function(err, uporabniki) {
        var uporabnikiMap = [];
        uporabniki.forEach(function (uporabnik) {
            uporabnikiMap.push(uporabnik);
        });
        res.send(uporabnikiMap);
    })
};

module.exports = {
    vrniUporabnike
};