import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import * as Collections from "/lib/collections";
import * as Schemas from "../../../lib/collections/schemas";

Meteor.methods({
  /**
   * @summary - Creates a Static Page
   * @param {String} title - The title of the page
   * @param {String} slug - the URI of the page
   * @param {String} content - the content of the page
   * @param {String} shopId - the ShopId of the page
   * @param {String} pageOwner of the page
   * @param {String} createdAt, the date of creation of the page
   * @return {void} there is no return
   */
  createPage: function (title, slug, content, shopId, pageOwner, createdAt) {
    check(title, String);
    check(slug, String);
    check(content, String);
    check(shopId, String);
    check(pageOwner, String);
    check(createdAt, Date);

    const page = {
      title: title,
      slug: slug,
      content: content,
      shopId: shopId,
      pageOwner: pageOwner,
      createdAt: createdAt
    };
    check(page, Schemas.StaticPages); // should be typeof schema
    Collections.StaticPages.insert(page);
  },

  /**
   * @summary - Edits a Static Page
   * @param {String} _id - The ID of the page to be updated
   * @param {String} title - The new page title
   * @param {String} slug - The new page slug
   * @param {String} content - The new page content
   * @param { String} shopId - The shopId
   * @return {void} No return value
   */
  "editPage"(_id, title, slug, content, shopId) {
    check(_id, String);
    check(title, String);
    check(slug, String);
    check(content, String);
    check(shopId, String);

    const page = {
      title,
      slug,
      content,
      shopId
    };
    Collections.StaticPages.update(_id, {
      $set:
        page
    });
  },

  /**
   * @summary - Deletes a Static Page
   * @param {String} _id - The id of the page to be deleted
   * @return {void} No return value
   */
  "deletePage"(_id) {
    check(_id, String);
    Collections.StaticPages.remove(_id);
  }
});
