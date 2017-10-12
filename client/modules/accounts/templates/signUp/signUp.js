import { LoginFormSharedHelpers } from "/client/modules/accounts/helpers";
import { Template } from "meteor/templating";


/**
 * onCreated: Login form sign up view
 */
Template.loginFormSignUpView.onCreated(() => {
  const template = Template.instance();

  template.uniqueId = Random.id();
  template.formMessages = new ReactiveVar({});
  template.type = "signUp";
});

/**
 * Helpers: Login form sign up view
 */
Template.loginFormSignUpView.helpers(LoginFormSharedHelpers);

/**
 * Events: Login form sign up view
 */
Template.loginFormSignUpView.events({
  /**
   * Submit sign up form
   * @param  {Event} event - jQuery Event
   * @param  {Template} template - Blaze Template
   * @return {void}
   */
  "submit form": function (event, template) {
    event.preventDefault();

    // var usernameInput = template.$(".login-input--username");
    const emailInput = template.$(".login-input-email");
    const passwordInput = template.$(".login-input-password");
    const usernameInput = template.$("#username");
    const shopNameInput = template.$("#shop-name");
    const shopAddressInput = template.$("#shop-address");
    const phoneInput = template.$("#phone-number");
    let type = "userSignup";

    const email = emailInput.val().trim();
    const password = passwordInput.val().trim();
    const username = usernameInput.val().trim();
    const shopName = shopNameInput.val().trim();
    const shopAddress = shopAddressInput.val().trim();
    const phone = phoneInput.val().trim();

    const validatedEmail = LoginFormValidation.email(email);
    const validatedPassword = LoginFormValidation.password(password);

    const templateInstance = Template.instance();
    const errors = {};

    templateInstance.formMessages.set({});

    if (validatedEmail !== true) {
      errors.email = validatedEmail;
    }

    if (validatedPassword !== true) {
      errors.password = validatedPassword;
    }

    if (Session.get("vendorSignup")) {
      if (username.length < 1) {
        errors.username = "Please choose a username";
      }

      if (shopName.length < 1) {
        errors.shopName = "Please enter a shop name";
      }

      if (shopAddress.length < 1) {
        errors.shopAddress = "Please enter a shop address";
      }

      if (phone.length < 1) {
        errors.phone = "Please enter a phone number";
      }
      type = "vendorSignup";
    }

    if ($.isEmptyObject(errors) === false) {
      templateInstance.formMessages.set({
        errors: errors
      });
      // prevent signup
      return;
    }

    const newUserData = {
      username: username,
      email: email,
      password: password,
      shopName,
      shopAddress,
      phone,
      type
    };

    Accounts.createUser(newUserData, function (error) {
      if (error) {
        // Show some error message
        templateInstance.formMessages.set({
          alerts: [error]
        });
      } else {
        // if its vendor signup add if stattement
        const shopAdminUserId = Meteor.users.findOne({
          "emails.address": newUserData.email
        })._id;
        // Close dropdown or navigate to page
        // create shop if signup is successful
        Meteor.call("shop/createShop", shopAdminUserId, newUserData, (shopError) => {
          if (shopError) {
            console.log(shopError);
          }
        });
      }
    });
  },
  "change #vendor-registration": function (event) {
    // toggleChecked(event.target.checked);
    if (event.target.checked) {
      Session.set("vendorSignup", true);
    } else {
      Session.set("vendorSignup", false);
    }
  }
});
