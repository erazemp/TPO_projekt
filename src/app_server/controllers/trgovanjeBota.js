const request = require('request');

const klicApi = (req, res) => {
    const options = {
        url: 'http://localhost:3000/api-napovedi/napovedi',
        json: true,
        body: {
            body: "to je body"
        },
        method: "POST",
    };
    console.log('API klic');
    request(options, function (napaka, odgovor, body) {
            console.log('klic koncan');
        }
    ).pipe(res);
};

module.exports = {
    klicApi
};