import { Template } from "meteor/templating";
import { NumericInput } from "/imports/plugins/core/ui/client/components";

/**
 * ordersListSummary helpers
 *
 * @returns paymentInvoice
 */
Template.ordersListSummary.helpers({
  invoice() {
    return this.invoice;
  },
  numericInputProps(value) {
    const { currencyFormat } = Template.instance().data;

    return {
      component: NumericInput,
      value,
      format: currencyFormat,
      isEditing: false
    };
  },
  showCancelButton() {
    return !(this.order.workflow.status === "canceled" || this.order.workflow.status === "coreOrderWorkflow/completed");
  }
});
/**
  * ordersListSummary events
  */
Template.ordersListSummary.events({
  /**
  * Submit form
  * @param  {Event} event - Event object
  * @param  {Template} instance - Blaze Template
  * @return {void}
  */
  "click button[name=cancel-order]"(event, instance) {
    event.stopPropagation();
    const state = instance.state;
    const order = state.get("order");
    const userType = "buyer";
    Alerts.alert({
      title: "Are you sure you want to cancel this order? This action can not be undone",
      showCancelButton: true,
      confirmButtonText: "Cancel Order"
    }, (isConfirm) => {
      if (isConfirm) {
        Meteor.call("orders/cancelOrder", order, userType, (error) => {
          if (error) {
            Logger.warn(error);
          } else {
            Alerts.toast("Order cancelled successfully!", "success", {
              autoHide: 1000
            });
          }
        });
      }
    });
  }
});

Template.ordersListSummary.onCreated(function () {
  // set template state
  this.state = new ReactiveDict();
  this.autorun(() => {
    const currentData = Template.currentData();
    const order = currentData.order;
    // add current order in state
    this.state.set("order", order);
  });
});
