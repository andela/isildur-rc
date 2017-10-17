const yaml = require("js-yaml");
const fs   = require("fs");
const expect = require("chai").expect;
const getId = require("../../../lib/get-elements.js");

beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = browserConfig.base_url.toString();
  browser.url(baseUrl);
});

describe("Payment by Wallet", function () {
  it("should be available when a user decides to buy a product", function () {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));
    const usrData = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/user-data.yml", "utf8"));

    const guestEmail = usrData.guest_email;
    const guestPw = usrData.guest_pw;

    browser.windowHandleFullscreen();
    browser.waitForExist(".product-grid");
    browser.click(eleMap.login_dropdown_btn);
    browser.waitForExist(eleMap.login_btn);
    browser.setValue(getId.retId(eleIds.login_email_fld_id), guestEmail);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), guestPw);
    browser.click(eleMap.login_btn);
    browser.waitForExist("#logged-in-display-name");
    browser.pause(3000);
    browser.waitForExist(".introjs-skipbutton");
    browser.pause(3000);
    browser.url("http://localhost:3000/reaction/product/example-product");
    browser.pause(5000);
    browser.click(eleMap.red_option);
    browser.waitForExist(".add-to-cart-text");
    browser.click(".add-to-cart-text");
    browser.waitForExist("#btn-checkout");
    browser.click("#btn-checkout");
    browser.pause(5000);
    // shopUser.userAddress();

    browser.scroll(0, 400);
    browser.pause(3000);
    browser.click(eleMap.free_shipping);

    browser.waitForExist(".text-left");
    browser.click(".text-left");
    browser.pause(5000);
    browser.waitForExist("//span[text()='Wallet']");
    browser.click("//span[text()='Wallet']");
    browser.pause(5000);
    browser.scroll(0, 600);
    browser.waitForExist("#pay-with-wallet");
    browser.click("#pay-with-wallet");
    browser.pause(10000);
    expect(browser.getAttribute("div", "order-item")).to.exist;
  });
});
