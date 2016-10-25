import { Session } from "meteor/session";
import { Template } from "meteor/templating";
<<<<<<< HEAD
import _ from "underscore";

Template.sortByRange.events({
  "change #sort-value": function (event) {
    Session.set("productSortValue", event.target.value);
  }
});

Template.searchFilter.events({
  "change #filter-by-price": function (event) {
    Session.set("filterPrice", event.target.value);
  },
  "change #filter-by-brand": function (event) {
    Session.set("filterBrand", event.target.value);
  }
});

Template.searchFilter.helpers({
  getBrands(products) {
    return _.uniq(_.pluck(products, "vendor"));
  }
});

Template.searchFilter.events({
  "change #filter-by-latest": function (event) {
    Session.set("filterLatest", event.target.value);
=======
// import _ from "underscore";

Template.sortByRange.events({
  "change #sort-value": function (event) {
    Session.set("sortValue", event.target.value);
>>>>>>> do not use revisions if the package is disabled (#1527)
  }
});
