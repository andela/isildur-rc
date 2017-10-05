"use strict";
require("dotenv").load();
const yaml = require("js-yaml");
const fs   = require("fs");
const expect = require("chai").expect;

beforeEach(function () {
  const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
  const baseUrl = process.env.REACTION_BASE_URL || browserConfig.base_url.toString();
  browser.url(baseUrl);
});

describe("Display of Product prices", function () {
  it("should display product in users local currency", function () {
    browser.pause("10000");
    // browser.waitForExist(".rui", "5000");
    // browser.waitForExist("#product-title", "5000");
    browser.waitForExist(".currency-symbol", "10000");
    browser.pause("10000");
    expect(browser.getText(".currency-symbol")).to.contain("₦4,624.44 - ₦7,116.44");
  });
});
