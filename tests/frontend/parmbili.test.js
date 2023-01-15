/* Unit test require. */
const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

/* Unit test chrome options setup */
const screen = {width: 1907, height: 1057};
let chrome_options = new chrome.Options().windowSize(screen);
chrome_options.addArguments("--proxy-server='direct://'");
chrome_options.addArguments("--proxy-bypass-list=*");
chrome_options.addArguments("--headless");
chrome_options.addArguments("--disable-gpu");
chrome_options.addArguments("--blink-settings=imagesEnabled=false"); 

describe("Parmbili Testcase", function() {
    this.timeout(50000);
    let driver;

    before(async function() {
        driver = await new Builder()
                    .forBrowser("chrome")
                    .setChromeOptions(chrome_options)
                    .build();

        /* start of test */           
        await driver.get("http://localhost:3000/")
    });

    beforeEach(async function() {
        await driver.sleep(1000);
    });
    
    after(async function() {
        await driver.quit();
    });

    /* Red - Check overlay if present */
    it('Should not appear the overlay button', async function() {    
    let overlay_button = ".overlay_button";

    const overlay_button_elements = await driver.findElements(By.css(overlay_button))
    assert(overlay_button_elements.length)
    });

    /* Green - Check overlay if present  */
    it("Should appear the overlay button if the tile item is clicked", async function(){
        let empty_tile = ".tile_item:nth-child(16)";
        let overlay_button = ".overlay_button";

        await driver.findElement(By.css(empty_tile)).click()
        const overlay_button_elements = await driver.findElements(By.css(overlay_button))
        assert(overlay_button_elements.length)
    });

    /* Red - check if the modal is present */
    it('Should not appear the modal body if plant button didnt click', async function() {
        let modal_body = ".modal-body";

        const modal_body_elements = await driver.findElements(By.css(modal_body))
        assert(modal_body_elements.length)
    });
    
    /* Green - check if the modal is present */
    it("Should appear the modal body if plant button is click", async function(){
        let overlay_button = ".overlay_button";
        let tilled_mode = ".tilled";
        let modal_body = ".modal-body";

        await driver.findElement(By.css(overlay_button)).click()
        await driver.findElement(By.css(tilled_mode)).click()
        await driver.findElement(By.css(overlay_button)).click()
        const modal_body_elements = await driver.findElements(By.css(modal_body))
        assert(modal_body_elements.length)
    });

    /* Red - check if total earnings change */
    it('Total earnings should not change the text if planted something', async function() { 
        let buy_plant_button = ".btn:nth-child(2)";
        let plant_choice = "label:nth-child(9)";
        let total_earnings = "total_earnings";

        await driver.findElement(By.css(plant_choice)).click() /* this button is choose what kind of plant */
        await driver.findElement(By.css(buy_plant_button)).click()
        {
            const buy_plant_element = await driver.findElement(By.css(buy_plant_button))
            await driver.actions({ bridge: true }).moveToElement(buy_plant_element).perform()
        }
        assert(await driver.findElement(By.id(total_earnings)).getText() == "Total Earnings: 50$")
    });
    
    /* Green - check if total earnings change */
    it("Total earnings should change the text if planted something", async function(){
        let total_earnings = "total_earnings";

        assert(await driver.findElement(By.id(total_earnings)).getText() != "Total Earnings: 50$")
    });

    /* Red - check if the remove plant modal is present */
    it('Should not appear the remove modal at the beginning', async function() {
        let modal_body = ".modal-body";
        const modal_body_elements = await driver.findElements(By.css(modal_body))
        assert(modal_body_elements.length)
    });
    
    /* Green - check if the remove plant modal is present */
    it("Should appear the remove modal when planted stated tiled is click", async function(){
        let planted_mode = ".planted";
        let overlay_button = ".overlay_button";
        let remove_button = ".remove_button";

        await driver.findElement(By.css(planted_mode)).click()
        await driver.findElement(By.css(overlay_button)).click()
        const remove_button_elements = await driver.findElements(By.css(remove_button))
        assert(remove_button_elements.length)
    });

    /* Red - check if it will turn to empty tile after harvest was click */
    it('Should not change to empty if the button when harvest is click', async function() {
        let harvest_mode = ".harvest";
        let harvest_button = ".overlay_button:nth-child(1)";

        await driver.findElement(By.css(harvest_mode)).click()
        await driver.findElement(By.css(harvest_button)).click()
        const harvest_element = await driver.findElements(By.css(harvest_mode))
        assert(harvest_element.length)
    });
    
    /* Green - check if it will turn to empty tile after harvest was click */
    it("Should change to empty tile when harvest is click", async function(){
        let harvest_mode = ".harvest";

        const harvest_element = await driver.findElements(By.css(harvest_mode))
        assert(!harvest_element.length)
    });

});