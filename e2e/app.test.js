import puppeteer from "puppeteer";
import { fork } from 'child_process';


describe("E2E Widget test", () => {
    let browser;
    let page;
    let server;
    let timeout = 30000;
    
    beforeAll(async () => {
        server = fork('./e2e/test-server.js');
        await new Promise((resolve, reject) => {

            server.on('error', (err) => {
                reject(err);
            });

            server.on('message', (message) => {
                if (message == 'ok') {
                    resolve();
                }
            });
        });

        console.log('Launching the browser...');
        browser = await puppeteer.launch({
            // headless: false,
            // slowMo: 50,
            // devtools: true,
        });
        console.log('Launched browser');
    }, timeout);
    
    afterAll(async () => {
        await browser.close();
        server.kill();
    });

    beforeEach(async () => {
        if (page) {
            await page.close();
        }
    })
    
    test.each([
        "253422525",
        "000001342",
        "ger354e",
        " 235 sdg- 23",
        "235678976235978523",
        "",
    ])(
        "Invalid card numbers are rejected",
        async (cardNum) => {
            page = await browser.newPage();
            await page.goto("http://localhost:9000", {
                timeout: timeout,
                waitUntil: "domcontentloaded",
            });
            
            const formWrapper = await page.$(
                ".contents__wrapper .widget__wrapper .form__wrapper",
            );
            const form = await formWrapper.$("form");
            const inputField = await form.$(".form__input");
            const submitButton = await form.$(".form__submit");
            const tooltip = await formWrapper.$(".form__tooltip");
            
            await inputField.type(cardNum);
            await submitButton.click();
            
            expect(tooltip.innerHTML).not.toBe("");
        },
        timeout,
    );
    
    test.each([
        "371449635398431",
        "30569309025904",
        "6011111111111117",
        "3530111333300000",
        "5555555555554444",
        "4111111111111111",
    ])(
        "Valid card numbers pass",
        async (cardNum) => {
            page = await browser.newPage();
            await page.goto("http://localhost:9000", {
                timeout: timeout,
                waitUntil: "domcontentloaded",
            });
            
            const formWrapper = await page.$(
                ".contents__wrapper .widget__wrapper .form__wrapper",
            );
            const form = await formWrapper.$("form");
            const inputField = await form.$(".form__input");
            const submitButton = await form.$(".form__submit");
            const tooltip = await formWrapper.$(".form__tooltip");
            
            await inputField.type(cardNum);
            await submitButton.click();
            
            expect(tooltip.innerHTML).toBeUndefined();
        },
        timeout,
    );
});
