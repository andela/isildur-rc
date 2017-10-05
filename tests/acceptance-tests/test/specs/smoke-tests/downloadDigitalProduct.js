// const yaml = require("js-yaml");
// const fs   = require("fs");
// const expect = require("chai").expect;
// const getId = require("../../../lib/get-elements.js");
// const dotenv = require("dotenv");

// dotenv.config();
// beforeEach(function () {
//   const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
//   const baseUrl = browserConfig.base_url.toString();
//   browser.url(baseUrl);
// });

// describe("Digital product ", function () {
//   it("should be available for download after it has been paid for", function () {
//     const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
//     // const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));
//     // const usrData = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/user-data.yml", "utf8"));

//     // default to process env if we've got that
//     // const adminEmail = process.env.REACTION_EMAIL;
//     // const adminPassword = process.env.REACTION_AUTH;

//     browser.pause("5000");
//     browser.click("//div[text()='BABY GROOT']");
//     browser.pause("2000");
//     browser.click(eleMap.add_product_to_cart);
//     browser.pause("3000");
//     browser.click("#btn-checkout");
//     browser.pause("3000");
//     browser.click("//a[text()='Continue as Guest']");
//     browser.pause("3000");
//     expect(browser.getAttribute("button", "btn btn-success no-round")).to.exist;
//   });
// });
