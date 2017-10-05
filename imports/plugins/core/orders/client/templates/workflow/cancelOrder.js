import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Router } from "/client/api";

const validateComment = (comment) => {
  check(comment, Match.OptionalOrNull(String));
  // If comment is valid
  if (comment.length >= 10) {
    return true;
  } else if (comment.length === 0) {
    return { error: "INVALID_COMMENT",
      reason: "Specify a reason for cancelling" };
  }
  // If comment is invalid
  return {
    error: "INVALID_COMMENT",
    reason: "The reason must be at least 10 characters long."
  };
};

Template.coreOrderCancelOrder.onCreated(function () {
  // create an instance of this template
  const template = Template.instance();
  // store the form in a reactive variable
  template.showCancelOrderForm = ReactiveVar(true);
  // set a state
  this.state = new ReactiveDict();
  template.formMessages = new ReactiveVar({});

  this.autorun(() => {
    const currentData = Template.currentData();
    const order = currentData.order;

    if (order.workflow.status === "canceled") {
      template.showCancelOrderForm = ReactiveVar(false);
    }

    this.state.set("order", order);
  });
});

Template.coreOrderCancelOrder.events({
  "change .cancel-reason"(event, template) {
    const cancelReason = template.$(".cancel-reason");
    const selectedReason = cancelReason.val().trim();
    if (selectedReason === "Others") {
      Session.set("showEditor", true);
    } else {
      Session.set("showEditor", false);
    }
  },
  "submit form[name=cancelOrderForm]"(event, template) {
    event.preventDefault();

    let comment;
    const cancelReason = template.$("#other-reasons");
    const otherCancelReason = (template.$(".cancel-reason")).val().trim();
    if (otherCancelReason === "Others") {
      comment = cancelReason.val().trim();
    } else {
      comment = otherCancelReason;
    }

    const validatedComment = validateComment(comment);
    const templateInstance = Template.instance();
    const errors = {};

    templateInstance.formMessages.set({});

    if (validatedComment !== true) {
      errors.comment = validatedComment;
    }

    if ($.isEmptyObject(errors) === false) {
      templateInstance.formMessages.set({
        errors: errors
      });
      // prevent order cancel
      return;
    }

    const cancelComment = {
      body: comment,
      userId: Meteor.userId(),
      updatedAt: new Date
    };

    const state = template.state;
    const order = state.get("order");
    const userType = "vendor";
    Alerts.alert({
      title: "Are you sure you want to cancel this order? This action can not be undone",
      showCancelButton: true,
      confirmButtonText: "Cancel Order"
    }, (isConfirm) => {
      if (isConfirm) {
        Meteor.call("orders/cancelOrder", order, userType, cancelComment, (error) => {
          if (!error) {
            template.showCancelOrderForm.set(false);
          } else {
            Router.go("/reaction/dashboard/orders");
            Alerts.toast("Order cancelled successfully!", "success", {
              autoHide: 1000
            });
          }
        });
      }
    });
  }
});

Template.coreOrderCancelOrder.helpers({
  showCancelOrderForm() {
    const template = Template.instance();
    return template.showCancelOrderForm.get();
  },

  messages() {
    return Template.instance().formMessages.get();
  },
  adminDashboard() {
    return true;
  },
  showEditor() {
    return Session.get("showEditor");
  },

  hasError(error) {
    // True here means the field is valid
    // We're checking if theres some other message to display
    if (error !== true && typeof error !== "undefined") {
      return "has-error has-feedback";
    }

    return false;
  }
});
