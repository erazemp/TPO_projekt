const pridobiNapovedAPI = (zgodovinskiPodatki) => {
    console.log('napoved api prejel podatke:');
    console.log(zgodovinskiPodatki);
    var stHigh = 0;
    var stLow = 0;
    var high = 0;
    var low = 0;

    for (let i in zgodovinskiPodatki) {
        if (zgodovinskiPodatki.hasOwnProperty(i)) {
            const razlika = zgodovinskiPodatki[i + 1] - zgodovinskiPodatki[i];
            if (razlika < 0) {
                low += (-razlika);
                stLow++;
            } else {
                high += razlika;
                stHigh++;
            }
        }
    }
    // high = high / stHigh;
    // low = low / stLow;

    return {
        high: high,
        low: low
    }
};

module.exports = pridobiNapovedAPI;
