/* Unit test require. */
const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const { click } = require("@testing-library/user-event/dist/click");
const ASSERT_DURATION = {
    fast: 3000,
    faster: 2000,
    fastest: 1000
}
/* Unit test chrome options setup */
const screen = {width: 1907, height: 1057};
let chrome_options = new chrome.Options().windowSize(screen);
chrome_options.addArguments("--proxy-server='direct://'");
chrome_options.addArguments("--proxy-bypass-list=*");
// chrome_options.addArguments("--headless");
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

    /**
    * DOCU: This function is going to check every clickable element if it's working <br>
    * Last updated at: January 18, 2023
    * @author Jp
    */
    async function testElementIfWorking(assert_element){
        await driver.wait(until.elementLocated(By.css(assert_element)), ASSERT_DURATION.fast);
        {
            const clickable_element = await driver.findElements(By.css(assert_element));
            assert(clickable_element.length);
        }
        await driver.wait(until.elementIsVisible(await driver.findElement(By.css(assert_element))), ASSERT_DURATION.fast);
    }

    /**
    * DOCU: This function is going to assert all elements to check if it's present <br>
    * Last updated at: January 18, 2023
    * @author Jp
    */
    async function assertPresent(assert_element){
        {
            const element = await driver.findElements(By.css(assert_element)); 
            assert(element.length);
        }
    }
        

    /**
    * DOCU: (Parmbili Activity) 1. Check overlay if present. <br>
    * Last updated at: January 17, 2023
    * @author Jp
    */
    /* Red */
    it('Should not appear the overlay button at the beginning of the app', async function() {    
        await assertPresent(".overlay_button");
    });

    /* Green */
    it("Should appear the overlay button if the tile item is clicked", async function(){
        let empty_tile = ".tile_item:nth-child(16)";

        /* Click empty tile state */
        await driver.findElement(By.css(empty_tile)).click();
        await testElementIfWorking(empty_tile);

        /* after testing if button is working when click, let's assert the overlay_button to see if it is now visible */
        await assertPresent(".overlay_button");
    });

    /**
    * DOCU: (Parmbili Activity) 2. Check if the modal is present. <br>
    * Last updated at: January 17, 2023
    * @author Jp
    */
    /* Red */
    it('Should not appear the modal body if plant button didnt click', async function() {
        await assertPresent(".modal-body");
    });
    
    /* Green */
    it("Should appear the modal body if plant button is click", async function(){
        let overlay_button = ".overlay_button";

        /* Overlay Button for Empty State */
        await driver.findElement(By.css(overlay_button)).click();
        await testElementIfWorking(overlay_button);

        /* Button for Tilled State */
        await driver.findElement(By.css(".tilled")).click();
        await testElementIfWorking(".tilled");

        /* Overlay Button for Tilled State */
        await driver.findElement(By.css(overlay_button)).click();
        await testElementIfWorking(overlay_button);

        /* assert the modal if it's present */
        await assertPresent(".modal-body");
    });

    /**
    * DOCU: (Parmbili Activity) 3. Check if total earnings change whenever you buy/harvest plants. <br>
    * Last updated at: January 17, 2023
    * @author Jp
    */

    /* Red */
    it('Total earnings should not change the text if planted something', async function() { 
        let buy_plant_button = ".btn:nth-child(2)";
        let potato_choice = "label:nth-child(3)";

        /* Click potato plant in modal */
        await driver.findElement(By.css(potato_choice)).click();
        await testElementIfWorking(potato_choice);

        /* Click the plant button to enter */
        await driver.findElement(By.css(buy_plant_button)).click();
        await testElementIfWorking(buy_plant_button);

        assert(await driver.findElement(By.id("total_earnings")).getText() === "Total Earnings: 50$");
    });
    
    /* Green  */
    it("Total earnings should change the text if planted something", async function(){
        assert(await driver.findElement(By.id("total_earnings")).getText() !== "Total Earnings: 50$");
    });

    /**
    * DOCU: (Parmbili Activity) 4. Check if the remove plant modal is present <br>
    * Last updated at: January 17, 2023
    * @author Jp
    */

    /* Red  */
    it('Should not appear the remove modal at the beginning', async function() {
        /* assert the remove button if it's present */
        await assertPresent(".remove_button");
    });
    
    /* Green */
    it("Should appear the remove modal when planted stated tilled is click", async function(){
        let planted_mode = ".planted";
        let overlay_button = ".overlay_button";

        /* Button for Planted State */
        await driver.findElement(By.css(planted_mode)).click();
        await testElementIfWorking(planted_mode);

        /* Overlay button for Planted State */
        await driver.findElement(By.css(overlay_button)).click();
        await testElementIfWorking(overlay_button);

        /* assert the remove button if it's present */
        await assertPresent(".remove_button");
    });

    /**
    * DOCU: (Parmbili Activity) 5. Check if it will turn to empty tile after harvest was click <br>
    * Last updated at: January 17, 2023
    * @author Jp
    */

    /* Red  */
    it('Should not change to empty if the button when harvest is click', async function() {
        let cancel_button = ".cancel_button";
        let harvest_mode = ".harvest";
        let harvest_button = ".overlay_button:nth-child(1)";

        /* Button for Harvest State */
        await driver.findElement(By.css(cancel_button)).click();
        await testElementIfWorking(cancel_button);

        /* Button for Harvest State */
        await driver.findElement(By.css(harvest_mode)).click();
        await testElementIfWorking(harvest_mode);

        /* Button to harvest the plant */
        await driver.findElement(By.css(harvest_button)).click();
        await testElementIfWorking(harvest_button);

        await assertPresent(harvest_mode);
    });
    
    /* Green */
    it("Should change to empty tile when harvest is click", async function(){
        {
            const harvest_element = await driver.findElements(By.css(".harvest"));
            assert(!harvest_element.length);
        }
    });

    /**
    * DOCU: (Parmbili Activity) 6. Check if the remove plant is working <br>
    * Last updated at: January 18, 2023
    * @author Jp
    */

    /* Green */
    it("Should allow user to remove plant", async function(){
        let empty_tile = ".tile_item:nth-child(15)";
        let tilled_mode = ".tilled";
        let planted_mode = ".planted";
        let overlay_button = ".overlay_button";
        let remove_button = ".remove_button";

        /* Click empty tile state */
        await driver.findElement(By.css(empty_tile)).click();
        await testElementIfWorking(empty_tile);

        /* Overlay Button for Empty State */
        await driver.findElement(By.css(overlay_button)).click();
        await testElementIfWorking(overlay_button);

        /* Button for Tilled State */
        await driver.findElement(By.css(tilled_mode)).click();
        await testElementIfWorking(tilled_mode);

        /* Overlay Button for Tilled State */
        await driver.findElement(By.css(overlay_button)).click();
        await testElementIfWorking(overlay_button);

        /* Button for Planted State */
        await driver.findElement(By.css(planted_mode)).click();
        await testElementIfWorking(planted_mode);

        /* Overlay button for Planted State */
        await driver.findElement(By.css(overlay_button)).click();
        await testElementIfWorking(overlay_button);

        await driver.findElement(By.css(remove_button)).click();
        await testElementIfWorking(remove_button);

        /* assert the remove button if it's present */
        await assertPresent(empty_tile);
    });

});