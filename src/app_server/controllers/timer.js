const trgovanjeBota = require('./trgovanjeBota');
const DomacaStran = require('../controllers/domaca-stran');

// todo: odkomentiraj in izbrisi ko koncamo z razvijanjem
// const intervalTrgovanjaBotov = 5 * 60 * 1000; // 5 minut
const intervalTrgovanjaBotov = 10000; // 10 s

const intervalPosodobiPodjetjaInNapovedi = 24 * 60 * 60 * 1000; // 1 dan

const preveriCas = () => {
    // todo: ob prvem zagonu odkomentiraj te 3 metode, da se baza pravilno postavi, naslednji zagon
    // todo: nato ugasni server, zakomentiraj te vrstice nazaj, da ne obremnjujemo API-ja
    // DomacaStran.apiKlicZaSeznamDelnic();
    // DomacaStran.pridobiZgodovinskePodatkePodjetij();
    // trgovanjeBota.posodobiNapovedi();


    setInterval(trgovanjeBota.sproziTrgovanje, intervalTrgovanjaBotov);
    setInterval(DomacaStran.apiKlicZaSeznamDelnic, intervalPosodobiPodjetjaInNapovedi);
    setInterval(DomacaStran.pridobiZgodovinskePodatkePodjetij, intervalPosodobiPodjetjaInNapovedi + 10);
    setInterval(trgovanjeBota.posodobiNapovedi, intervalPosodobiPodjetjaInNapovedi + 20);
};

module.exports = preveriCas;