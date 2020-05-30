let mongoose = require('../src/node_modules/mongoose');

let chai = require('../src/node_modules/chai');
let chaiHttp = require('../src/node_modules/chai-http');
let server = require('../src/app');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe('testni podatki', () => {
    describe('izbris testnih podatkov iz baze', () => {
        it('izbris', (done) => {
            chai.request(server)
                .delete('/api/db/izbrisi')
                .end((napaka, odgovor) => {
                    expect(odgovor.body).to.deep.equal({obvestilo: 'Uspesen izbris'});
                    done();
                });
        });
    });

    describe('vnos testnih podatkov v bazo', () => {
        it('vnos', (done) => {
            chai.request(server)
                .post('/api/db/vstavi')
                .end((napaka, odgovor) => {
                    expect(odgovor.body).to.deep.equal({obvestilo: 'Uspešno dodani podatki'});
                    done();
                })
        })
    });
});

describe('avtentikacija uporabnika', () => {
    describe('registracija novega uporabnika', () => {
        it('registracija brez vseh podatkov', (done) => {
            let novUporabnik = {
                uporabniskoIme: "test",
                geslo: "123456"
            };
            chai.request(server)
                .post('/api/registracija')
                .send(novUporabnik)
                .end((napaka, odgovor) => {
                    odgovor.should.have.status(400);
                    expect(odgovor.body).to.deep.equal({sporočilo: "Zahtevani so vsi podatki"});
                    done();
                })
        });

        // it('registracija ze obstojecega uporabnika', (done) => {
        //     let novUporabnik = {
        //         ime: "Aljaz",
        //         priimek: "Smaljcelj",
        //         email: "aljaz@gmail.com",
        //         vloga: 0,
        //         uporabniskoIme: "alko",
        //         ocena: "2",
        //         denar: 14,
        //         datumPrijave: new Date(),
        //         geslo: "12345678",
        //     };
        //     chai.request(server)
        //         .post('/api/registracija')
        //         .send(novUporabnik)
        //         .end((napaka, odgovor) => {
        //             odgovor.should.have.status(409);
        //             expect(odgovor.body).to.deep.equal({"sporočilo": "Uporabnik že obstaja."});
        //         });
        // });

        it('registracija z vsemi podatki', (done) => {
            let novUporabnik = {
                ime: "test",
                priimek: "priimek",
                email: "test@gmail.com",
                vloga: 0,
                uporabniskoIme: "testniUporabnik",
                ocena: 4,
                denar: 1000,
                datumPrijave: new Date(),
                geslo: "12345678",
            };
            chai.request(server)
                .post('/api/registracija')
                .send(novUporabnik)
                .end((napaka, odgovor) => {
                    odgovor.should.have.status(200);
                    odgovor.body.should.have.property('žeton');
                    done();
                })

        })
    });

    describe('prijava uporabnika', () => {
        it('prijava z napačnimi podatki', (done) => {
            let uporabnik = {
                email: "email@email.si",
                geslo: "geslo"
            };
            chai.request(server)
                .post('/api/prijava')
                .send(uporabnik)
                .end((napaka, odgovor) => {
                    odgovor.should.have.status(401);
                    done();
                })
        });

        it('prijava brez vseh podatkov', (done) => {
            let uporabnik = {
                email: "email@email.si"
            };
            chai.request(server)
                .post('/api/prijava')
                .send(uporabnik)
                .end((napaka, odgovor) => {
                    odgovor.should.have.status(400);
                    expect(odgovor.body).to.deep.equal({"sporočilo": "Zahtevani so vsi podatki"});
                    done();
                });
        });

        it('prijava s pravimi podatki', (done) => {
            let uporabnik = {
                email: "test@gmail.com",
                geslo: "12345678"
            };
            chai.request(server)
                .post('/api/prijava')
                .send(uporabnik)
                .end((napaka, odgovor) => {
                    odgovor.should.have.status(200);
                    odgovor.body.should.have.property('žeton');
                    done();
                });
        });
    });
});

describe('delnice', () => {
    describe('/GET delnice', () => {
        it('vrni vsa podjetja, ki jih hranimo v bazi', (done) => {
            chai.request(server)
                .get('/api/domaca-stran')
                .end((napaka, odgovor) => {
                    odgovor.should.have.status(200);
                    odgovor.body.should.be.a('array');
                    odgovor.body.length.should.be.eql(504);
                    done();
                })
        });
    });

    describe('/GET zgodovinske podatke delnice AAPL', () => {
        it('vrni zgodovinske podatke podjetja AAPL', (done) => {
            chai.request(server)
                .get('/api/delnice/AAPL')
                .end((napaka, odgovor) => {
                    odgovor.should.have.status(200);
                    odgovor.body.should.be.a('array');
                    done();
                })
        })
    });

});