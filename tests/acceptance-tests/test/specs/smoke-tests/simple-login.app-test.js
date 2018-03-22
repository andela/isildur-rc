// "use strict";
// require("dotenv").load();
// const yaml = require("js-yaml");
// const fs   = require("fs");
// const expect = require("chai").expect;
// const getId = require("../../../lib/get-elements.js");
// const dotenv = require("dotenv");

// dotenv.config();

// beforeEach(function () {
//   const browserConfig = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/settings.yml", "utf8"));
//   const baseUrl = process.env.REACTION_BASE_URL || browserConfig.base_url.toString();
//   browser.url(baseUrl);
//   // browser.getSession().then(function (sessionid) {
//   //   browser.sessionID = sessionid.id_;
//   // });
// });

// describe("simple login test", function () {
//   it("verify user is able to login - and verifies user name in dropdown", function () {
//     const eleMap = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-map.yml", "utf8"));
//     const eleIds = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/elements/element-ids.yml", "utf8"));
//     // const usrData = yaml.safeLoad(fs.readFileSync("./tests/acceptance-tests/config/user-data.yml", "utf8"));

//     // default to process env if we've got that
//     const adminEmail = process.env.REACTION_EMAIL;
//     const adminPassword = process.env.REACTION_AUTH;
//     const adminUserName = process.env.REACTION_USER;

//     browser.pause("5000");
//     browser.click(eleMap.login_dropdown_btn);
//     browser.pause(5000);
//     browser.setValue(getId.retId(eleIds.login_email_fld_id), adminEmail);
//     browser.setValue(getId.retId(eleIds.login_pw_fld_id), adminPassword);
//     browser.click(eleMap.login_btn);
//     browser.pause("5000");
//     expect(browser.getText("#logged-in-display-name")).to.equal(adminUserName);
//   });
// });
