
const { expect } = require('@wdio/globals')


describe('EPAM', () => {
    beforeEach(async() =>{
        await browser.url("https://www.epam.com/");
        await browser.maximizeWindow();
        
    });

    it('Check the title is correct', async () => {
        
        const pageTitle=await browser.getTitle();
        expect(pageTitle).toEqual("EPAM | Software Engineering & Product Development Services")
        
    })

    it("Check the ability to switch Light / Dark mode", async ()=>{
        const toggle= await $$(`.theme-switcher`)[1];
        //await browser.moveToElement(toggle);
        const body= await $$("BODY")[0];
        await toggle.waitForDisplayed();
                
        await toggle.click();
        await browser.pause(2000);
        color= await body.getAttribute("class");
        expect(color).toBe("fonts-loaded light-mode")
        

    })
    it("Check that allow to change language to UA", async()=>{
        const langButton= await $(".location-selector__button");
        await langButton.click();
        const panel= await $(".location-selector__panel");
        await panel.waitForDisplayed
        const list= await $$(".location-selector__list")[0];
        await list.waitForDisplayed();
        const ukr= await list.$$("li")[5].$('a');
        await ukr.waitForClickable();
        
        await ukr.click();
        await browser.pause(3000);
        //const vaca= await browser.getUrl()
        
        
        expect( await browser.getUrl()).toBe("https://careers.epam.ua/");




    })

    it("Check the policies list", async()=>{
        await browser.url("https://www.epam.com/");

        const policies = await $(".policies-links-wrapper");
        await policies.scrollIntoView({ block: "center", behavior: "smooth" });
        
        await policies.waitForDisplayed();
        await browser.pause(2000);
        const policiesLeft= await $$(".ul.policies-left")[0];
        const policiesRight=await $$(".ul.policies-right")[0];
        // await policiesLeft.scrollIntoView();
        expect(await policiesLeft.$$("li")[0].$('a').getText()).toBe("INVESTORS");
        expect(await  policiesLeft.$$("li")[1].$('a').getText()).toBe("OPEN SOURCE");
        expect(await  policiesLeft.$$("li")[2].$('a').getText()).toBe("PRIVACY POLICY");
        expect(await  policiesRight.$$("li")[0].$('a').getText()).toBe("COOKIE POLICY");
        expect(await  policiesRight.$$("li")[1].$('a').getText()).toBe("APPLICANT PRIVACY NOTICE");
        expect(await  policiesRight.$$("li")[2].$('a').getText()).toBe("WEB ACCESSIBILITY");

    })

    it("Check that allow to switch location list by region", async()=>{
        const loc=await $("div[id=id-890298b8-f4a7-3f75-8a76-be36dc4490fd]");
        await loc.scrollIntoView({ block: "center", behavior: "smooth" });
        await loc.waitForDisplayed();
        await browser.pause(2000);
        const am= await $("//a[@data-item=0]");
        const emea= await $("//a[@data-item=1]");
        const apac= await $("//a[@data-item=2]");
        expect(am).toBeDisplayed();
        expect(emea).toBeDisplayed();
        expect(apac).toBeDisplayed();
        await emea.click();
        await loc.scrollIntoView({ block: "center", behavior: "smooth" });
        await browser.pause(2000);
        const coun= await $(`[data-country-title="Armenia"]`);
        expect(coun).toBeDisplayed();
        await apac.click();
        const coun2= await $(`[data-country-title="Australia"]`);
        expect(coun2).toBeDisplayed();
    })

    it("Check the search function", async()=>{

        const sb= await $(`button[class="header-search__button header__icon"]`);
        await sb.click();
        const sf= await $("#new_form_search");
        await sf.waitForDisplayed();
        await sf.setValue("AI");
        const but= await $(`button[class="custom-button button-text font-900 gradient-border-button large-gradient-button uppercase-text custom-search-button"]`);
        await but.click();
        await browser.pause(2000);
        expect(await browser.getUrl()).toBe("https://www.epam.com/search?q=AI");



    })

    it("Chack form's fields validation", async()=>{
        await browser.url("https://www.epam.com/about/who-we-are/contact");
        const b=await $(`#onetrust-accept-btn-handler`)
        await b.click();
        let req= await $$(`.validation-field`);
        expect( req.length).toBe(0);
        const button= await $(`.button-ui`);
        // await button.scrollIntoView();
        await button.waitForDisplayed()
        // await browser.pause(2000);
        await button.click();
        await browser.pause(2000);
        req= await $$(`.validation-field`);
        expect(req.length).toBe(6);

        



    })
    it("Check tha the Company logo on the header lead to the main page", async()=>{
        await browser.url("https://www.epam.com/about");
        const logo= await $(`a[class="header__logo-container desktop-logo"]`);
        await logo.waitForDisplayed();
        await logo.click();
        await browser.pause(2000);

        expect(await browser.getUrl()).toBe("https://www.epam.com/")
    })

    it("Check that allows to download report", async()=>{
        await browser.url("https://www.epam.com/about");
        const button= await $(`a[class="button-ui-23 btn-focusable"]`);
        //await button.scrollIntoView({ block: "center", behavior: "smooth" });
        await  button.waitForDisplayed();
        await button.click();
        await browser.pause(2000);
        const downHre=await button.getAttribute(`href`);
        const downUrl= new URL(downHre);
        const full= downUrl.pathname;
        const split=full.split(`/`);
        const fileName= split.splice(-1)[0];
        //const filepath= path.join(global.downloadDir, fileName);
        const ext =fileName.split(".").splice(1)[0];
        const name=fileName.split(".").splice(0,1)[0];

        await browser.pause(5000);
        
        expect(name).toBe("EPAM_Corporate_Overview_Q3_october")
        expect(ext).toBe("pdf")




    })

})

