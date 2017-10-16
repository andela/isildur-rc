"use strict";
require("dotenv").load();
const yaml = require("js-yaml");
const fs   = require("fs");
const expect = require("chai").expect;
const getId = require("../../../lib/get-elements.js");
const dotenv = require("dotenv");

dotenv.config();

beforeEach(() => {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = process.env.REACTION_BASE_URL || browserConfig.base_url.toString();
  browser.url(baseUrl);
});

describe("Multi Vendor Test", () => {
  it("verify ae", () => {
    const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
    const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));

    const regEmail = "user@email.com";
    const regPassword = "password";
    const regUsername = "dave";
    const regShop = "Dave Limited";
    const regShopAd = "3, London Lane";
    const regPhone = "01234567890";


    browser.pause("5000");
    browser.click(eleMap.login_dropdown_btn);
    browser.pause(5000);
    browser.click(eleMap.register_btn);
    browser.setValue(getId.retId(eleIds.login_email_fld_id), regEmail);
    browser.setValue(getId.retId(eleIds.login_pw_fld_id), regPassword);
    browser.click("input#vendor-registration");
    browser.setValue(eleMap.register_username_field, regUsername);
    browser.setValue(eleMap.register_shop_field, regShop);
    browser.setValue(eleMap.register_shop_add_field, regShopAd);
    browser.setValue(eleMap.register_phone_field, regPhone);
    browser.pause("5000");
    browser.click(eleMap.register_submit);
    browser.pause("5000");
    browser.click(eleMap.skip_tour);
    browser.pause("5000");
    browser.waitForExist(eleMap.admin_bar);
    expect(eleMap.admin_bar).to.exist;
  });
});
