import moment from "moment";
import { Template } from "meteor/templating";
import { Orders, Shops, Products } from "/lib/collections";

/**
 * dashboardOrdersList helpers
 *
 */
Template.dashboardOrdersList.helpers({
  orderStatus() {
    if (this.workflow.status === "coreOrderWorkflow/completed") {
      return "Completed";
    } else if (this.workflow.status === "canceled") {
      return "Canceled";
    } else if (this.workflow.status === "new") {
      return "Unprocessed";
    }
    return "Processing";
  },
  orders(data) {
    if (data.hash.data) {
      return data.hash.data;
    }
    return Orders.find({}, {
      sort: {
        createdAt: -1
      },
      limit: 25
    });
  },
  orderAge() {
    return moment(this.createdAt).fromNow();
  },
  shipmentTracking() {
    return this.shipping[0].shipmentMethod.tracking;
  },
  shopName() {
    const shop = Shops.findOne(this.shopId);
    return shop !== null ? shop.name : void 0;
  },
  isDigital() {
    const productId = this.items[0].productId;
    const sub = Meteor.subscribe("Product", productId);
    if (sub.ready()) {
      const product = Products.findOne(productId);
      return product.isDigital;
    }
    return null;
  },
  downloadUrl() {
    const productId = this.items[0].productId;
    const sub = Meteor.subscribe("Product", productId);
    if (sub.ready()) {
      const product = Products.findOne(productId);
      return product.downloadUrl;
    }
    return null;
  }
});
