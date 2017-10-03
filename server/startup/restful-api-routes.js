import { Accounts, Cart, Shops, Products, Orders, Inventory, Emails, Shipping, Discounts } from "/lib/collections/collections";
import Reaction from "/server/api/core";

const isPermitted = (user, role) => {
  return user.roles[Reaction.getShopId()].includes(role);
};

export default () => {
  const Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    defaultHeaders: {
      "Content-Type": "application/json"
    },
    version: "v1"
  });
  // apiOptions Object
  const apiOptions = (Collection) => {
    return {
      // route options
      routeOptions: {
        authRequired: true
      },

      // endpoint methods (GET/POST/PUT/DELETE/PATCH/)
      endpoints: {
        // GETALL METHOD
        getAll: {
          action() {
            // console.log("this.user =====>", this.user);
            const allRecords = Collection.find().fetch();
            return {
              statusCode: 200,
              status: "success",
              message: "All records",
              data: allRecords
            };
          }
        },

        // GET METHOD ON ANY COLLECTION
        get: {
          // TODO: write the get action() method
          action() {
            if (isPermitted(this.user, "admin") ||
            isPermitted(this.user, "guest") ||
            isPermitted(this.user, "owner")) {
              // Collection.findOne(this.urlParams.id).fetch();
              const records = Collection.findOne({ _id: this.urlParams.id });
              if (!records) {
                return {
                  statusCode: 404,
                  status: "fail",
                  message: "Record does not exist"
                };
              }
              return {
                statusCode: 200,
                status: "success",
                data: records
              };
            }
          }
        },

        post: {
          // TODO: write the post action() method
          action() {
            if (!(isPermitted(this.user, "admin")) ||
            isPermitted(this.user, "owner")) {
              return {
                statusCode: 401,
                status: "fail",
                message: "you do not have permission to add a record"
              };
            }
            if (isPermitted(this.user, "admin") ||
            isPermitted(this.user, "owner")) {
              const insertedData = Collection.insert(this.bodyParams);
              if (!insertedData) {
                return {
                  statusCode: 400,
                  status: "fail",
                  message: "Record Creation was not succesful"
                };
              }
              return {
                statusCode: 201,
                status: "success",
                data: insertedData
              };
            }
          }
        },

        put: {
          // TODO: write the put action() method
          action() {
            if (!(isPermitted(this.user, "admin")) ||
            isPermitted(this.user, "owner")) {
              return {
                statusCode: 401,
                status: "fail",
                message: "you do not have permission to edit this record"
              };
            }
            if (isPermitted(this.user, "admin") ||
            isPermitted(this.user, "owner")) {
              const update = Collection.upsert({
                _id: this.urlParams.id
              }, {
                $set: this.bodyParams
              });
              if (!update) {
                return {
                  statusCode: 404,
                  status: "fail",
                  message: "Record does not exist"
                };
              }
              const record = Collection.findOne(this.urlParams.id);
              return {
                statusCode: 200,
                status: "success",
                data: update, record
              };
            }
          }
        },

        delete: {
          // TODO: write the delete action() method
          action() {
            if (!(isPermitted(this.user, "admin")) ||
            isPermitted(this.user, "owner")) {
              return {
                statusCode: 401,
                status: "fail",
                message: "you do not have permission to delete a record"
              };
            }
            if (isPermitted(this.user, "admin") ||
            isPermitted(this.user, "owner")) {
              if (Collection._name === "Products") {
                const item = Collection.findOne(this.urlParams.id);
                item.isDeleted = true;
                const updatedCollection = Collection.upsert({ _id: this.urlParams.id }, {
                  $set: item
                });
                return {
                  statusCode: 204,
                  status: "success",
                  message: "Product is archived",
                  data: updatedCollection
                };
              }
              const updatedCollection = Collection.remove({_id: this.urlParams.id });
              return {
                statusCode: 204,
                status: "success",
                message: "Collection is deleted",
                data: updatedCollection
              };
            }
          }
        }

        // patch: {
        //   // TODO: write the patch action() method
        // }
      }
    };
  };

  // API Definition/Call on Collections
  Api.addCollection(Accounts, apiOptions(Accounts));
  Api.addCollection(Cart, apiOptions(Cart));
  Api.addCollection(Shops, apiOptions(Shops));
  Api.addCollection(Products, apiOptions(Products));
  Api.addCollection(Orders, apiOptions(Orders));
  Api.addCollection(Inventory, apiOptions(Inventory));
  Api.addCollection(Emails, apiOptions(Emails));
  Api.addCollection(Shipping, apiOptions(Shipping));
  Api.addCollection(Discounts, apiOptions(Discounts));
};
