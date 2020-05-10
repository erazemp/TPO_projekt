var assert = require('assert');
const { exec } = require("child_process");
const { describe, it, after, before } = require("mocha");
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const expect = require("chai").expect;

// enostavni test
describe('Enostavni test', function () {
    it('preveri, ali je 1 + 1 = 2', function () {
        assert.equal(1 + 1, 2);
    });
});

/**
 * URL naslovi
 */
let aplikacijaUrl = "http://localhost:8080/"; //HEROKU
let seleniumStreznikUrl = "http://localhost:4445/wd/hub";


/**
 * Obvladovanje napak
 */
process.on("unhandledRejection", (napaka) => {
    console.log(napaka);
});


/**
 * Funkcionalni testi
 */
(async function EduGeoCache() { //morda z veliko
    let brskalnik, jwtZeton;

    let pocakajStranNalozena = async (brskalnik, casVS, xpath) => {
        await brskalnik.wait(function() {
            return brskalnik.findElements(By.xpath(xpath)).then(elementi => {
                return elementi[0];
            });
        }, casVS * 1000, `Stran se ni naložila v ${casVS} s.`);
    }

    try {
        brskalnik = new Builder()
            .forBrowser("chrome")
            .setChromeOptions(new chrome.Options()
                .addArguments("start-maximized")
                .addArguments("disable-infobars")
                .addArguments("allow-insecure-localhost")
                .addArguments("allow-running-insecure-content")
            )
            .usingServer(seleniumStreznikUrl)
            .build();

        /*
        describe("Registracija uporabnika", async function() {
            this.timeout(30000);
            before(async function() { await brskalnik.get(aplikacijaUrl); });

            it("Registracija", async function() {
                await pocakajStranNalozena(brskalnik, 5,
                    "//a[contains(text(), 'Prijava')]");
                let povezava = await brskalnik.findElement(
                    By.xpath("//a[contains(text(), 'Prijava')]"));
                await expect(povezava).to.not.be.empty;
                await povezava.click();
            });
            context("Reg", async function() {
                it("Registracija uporabnika", async function() {
                    await pocakajStranNalozena(brskalnik, 5,
                        "//button[contains(text(), 'Registracija')]");
                    let ime = await brskalnik.findElement(By.css("input[name='ime']"));
                    await expect(ime).to.not.be.empty;
                    ime.sendKeys("Janez Novak");

                    let email = await brskalnik.findElement(
                        By.css("input[name='email']"));
                    await expect(email).to.not.be.empty;
                    email.sendKeys("janez.novak@gmail.com");
                    let uporabnisko_ime = await brskalnik.findElement(By.css("input[name='username']"));
                    await expect(uporabnisko_ime).to.not.be.empty;
                    uporabnisko_ime.sendKeys("Jazo");
                    let geslo = await brskalnik.findElement(By.css("input[name='geslo']"));
                    await expect(geslo).to.not.be.empty;
                    geslo.sendKeys("geslo1234");
                    let gesloPotrdi = await brskalnik.findElement(By.css("input[name='ponovigeslo']"));
                    await expect(gesloPotrdi).to.not.be.empty;
                    gesloPotrdi.sendKeys("geslo1234");
                    brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Registracija')]")).click();
                });

                it("preveri ali je uporabnik registriran", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//strong[contains(text(), 'Jazo')]");
                    let uporabnik = await brskalnik.findElement(
                        By.xpath("//strong[contains(text(), 'Jazo')]"));
                    await expect(uporabnik).to.not.be.empty;
                });
            });

            context("Navbar", async function() {
                it("gumb domov", async function() {
                    let povezava = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Domov')]"));
                    await expect(povezava).to.not.be.empty;
                });
                it("Nov dogodek", async function() {
                    let povezava = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Nov Dogodek')]"));
                    await expect(povezava).to.not.be.empty;
                });
                it("Profil", async function() {
                    let povezava = await brskalnik.findElement(
                        By.xpath("//strong[contains(text(), 'Jazo')]"));
                    await expect(povezava).to.not.be.empty;
                });
                it("Ogled profila", async function() {
                    let povezava = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Ogled profila')]"));
                    await expect(povezava).to.not.be.empty;
                });

            });

        });
        */
        //prijava
        //osnovni tok
        describe("Prijava uporabnika", async function() {
            this.timeout(30000);
            before(async function() { await brskalnik.get(aplikacijaUrl); });

            context("Prijava uporabnika", async function() {
                it("prijava", async function() {
                    await pocakajStranNalozena(brskalnik, 5,
                        "//a[contains(text(), 'Prijava')]");
                    let povezava = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Prijava')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();
                });
            });
            context("Prijava", async function() {
                it("Prijavi se", async function() {
                    await pocakajStranNalozena(brskalnik, 5,
                        "//button[contains(text(), 'Prijava')]");
                    let email = await brskalnik.findElement(By.css("input[name='email']"));
                    await expect(email).to.not.be.empty;
                    email.sendKeys("aljaz.smaljcelj@gmail.com");

                    let geslo = await brskalnik.findElement(By.css("input[name='geslo']"));
                    await expect(geslo).to.not.be.empty;
                    uporabniskoIme.sendKeys("12345678");

                    brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Prijava')]")).click();
                });

                it("preveri ali je uporabnik prijavljen", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//strong[contains(text(), 'Moj Profil')]");
                    let uporabnik = await brskalnik.findElement(
                        By.xpath("//strong[contains(text(), 'Moj Profil')]"));
                    await expect(uporabnik).to.not.be.empty;
                });
            });
        });
        //izjemni tok
        describe("Prijava uporabnika 2", async function() {
            this.timeout(30000);
            before(async function() { await brskalnik.get(aplikacijaUrl); });

            context("Prijava uporabnika 2", async function() {
                it("prijava 2", async function() {
                    await pocakajStranNalozena(brskalnik, 5,
                        "//a[contains(text(), 'Prijava')]");
                    let povezava = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Prijava')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();
                });
            });
            context("Prijava 2", async function() {
                it("Prijavi se 2", async function() {
                    await pocakajStranNalozena(brskalnik, 5,
                        "//button[contains(text(), 'Prijava')]");
                    let email = await brskalnik.findElement(By.css("input[name='email']"));
                    await expect(email).to.not.be.empty;
                    email.sendKeys("aljaz.smaljcelj@gmail.com");

                    let geslo = await brskalnik.findElement(By.css("input[name='geslo']"));
                    await expect(geslo).to.not.be.empty;
                    uporabniskoIme.sendKeys("12345678910");

                    brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Prijava')]")).click();
                });

                it("preveri ali je prijava neuspesna", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//[contains(text(), 'Napačno geslo!')]");
                    let prijavaGumb = await brskalnik.findElement(
                        By.xpath("//strong[contains(text(), 'Prijava')]"));
                    await expect(prijavaGumb).to.not.be.empty;
                });
            });
        });

    }catch (napaka) {
            console.log("TU SEM");
            console.log(new Error(napaka.message));
        } finally {}
})();