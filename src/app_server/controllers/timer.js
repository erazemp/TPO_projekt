const trgovanjeBota = require('./trgovanjeBota');
const DomacaStran = require('../controllers/domaca-stran');

// const intervalTrgovanjaBotov = 5 * 60 * 1000; // 5 minut
const intervalTrgovanjaBotov = 10000; // 10 s
const intervalPosodobiNapovedi = 24 * 60 * 60 * 1000; // 1 dan

const preveriCas = () => {
    console.log('nastavljen timer');
    console.log(intervalTrgovanjaBotov);
    console.log(intervalPosodobiNapovedi);
    trgovanjeBota.posodobiNapovedi();
    setInterval(trgovanjeBota.sproziTrgovanje, intervalTrgovanjaBotov);
    setInterval(trgovanjeBota.posodobiNapovedi, intervalPosodobiNapovedi);
};

module.exports = preveriCas;