const puppeteer = require('puppeteer');
const acc = require("./accounts");

let browser;
let page;
const width = 1300;
const height = 800;
const timeout = 50000;

//!!
const invLoginError = "//*[@id='login-container']/table/tbody/tr/td/div/div[1]/form/table/tbody/tr[3]/td[2]/div[2]";

describe("Тесты авторизации", () => {
    beforeAll(async () => {
        browser = await puppeteer.launch({headless: false,
            args: [`--window-size=${width},${height}` ,"--no-sandbox"]});
        page = await browser.newPage();
        await page.setViewport({width, height});
    });

    afterAll(async () => {
        await browser.close();
    });

    test("Верное сообщение об ошибке при авторизации неверного/несуществующего аккаунта", async () => {
        await page.goto(acc.domen);
        await page.waitFor(1000);
        await page.click("#Username");
        await page.type("#Username", acc.invLogin);
        await page.click("#Password");
        await page.type("#Password", acc.password);
        await page.click("#btnLogin");
        await page.waitForSelector("#btnLogin");
        await page.waitFor(3000);
        const error = await page.$x(invLoginError);
        let text = await page.evaluate(h1 => h1.textContent, error[0]);
        expect(text).toEqual("Неверный логин или пароль.");
    }, timeout);

    test("Успешная авторизация", async () => {
        await page.goto(acc.domen);
        await page.waitFor(1000);
        await page.click("#Username");
        await page.type("#Username", acc.authTestLogin);
        await page.click("#Password");
        await page.type("#Password", acc.password);
        await page.click("#btnLogin");
        await page.waitForSelector("#widget-adminAccounts");
    }, timeout);
});


describe("Тесты восстановления пароля", () => {
    beforeAll(async () => {
        browser = await puppeteer.launch({headless: false,
            args: [`--window-size=${width},${height}` ,"--no-sandbox"]});
        page = await browser.newPage();
        await page.setViewport({width, height});

    });

    afterAll(async () => {
        await browser.close();
    });

    test("Верное сообщение об ошибке при вводе кириллицы", async () => {
        await page.goto(acc.domen);
        await page.waitFor(1000);
        await page.click("#btnForgotPw");
        await page.type("#Userlogin", "тест");
        await page.click("#btnContinue");
        await page.waitForSelector("#btnContinue");
        const errText = await page.$eval("div.error", el => el.textContent);
        expect(errText).toEqual("Недопустимые символы.");
    }, timeout);

    test("Верное сообщение об ошибке при вводе несуществующего аккаунта", async () => {
        await page.goto(acc.domen);
        await page.waitFor(1000);
        await page.click("#btnForgotPw");
        await page.type("#Userlogin", acc.invLogin);
        await page.click("#btnContinue");
        await page.waitForSelector("#btnContinue");
        const errText = await page.$eval("div.error", el => el.textContent);
        expect(errText).toEqual("Вы указали неверный логин.");
    }, timeout);

    test("Верное сообщение об ошибке при восстановлении пароля с отсутствующим e-mail", async () => {
        await page.goto(acc.domen);
        await page.waitFor(1000);
        await page.click("#btnForgotPw");
        await page.type("#Userlogin", acc.pwTestLogin);
        await page.click("#btnContinue");
        await page.waitForSelector("#btnContinue");
        const errText = await page.$eval("div.error", el => el.textContent);
        expect(errText).toEqual("Для сотрудника не задан e-mail для восстановления пароля.");
    }, timeout);

    test("Отправка инструкций на e-mail", async () => {
        await page.goto(acc.domen);
        await page.waitFor(1000);
        await page.click("#btnForgotPw");
        await page.type("#Userlogin", acc.authTestLogin);
        await page.click("#btnContinue");
        await page.waitForSelector("div.recemail");
    }, timeout);

    test("Тест кнопки 'НАЗАД'", async () => {
        await page.goto(acc.domen);
        await page.waitFor(1000);
        await page.click("#btnForgotPw");
        await page.click("#btnBack");
        await page.waitForSelector("#btnForgotPw");
    }, timeout);

});