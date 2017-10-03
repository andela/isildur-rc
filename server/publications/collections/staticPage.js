import { Meteor } from "meteor/meteor";
import { StaticPages } from "/lib/collections";

Meteor.publish("StaticPages", function () {
  if (!this.userId) {
    return this.ready();
  }
  return StaticPages.find({});
});

// for listing on dashboard
