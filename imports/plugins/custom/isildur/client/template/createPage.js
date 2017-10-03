import { Reaction } from "/client/api";
import { Template } from "meteor/templating";
import { StaticPages } from "/lib/collections";
import SimpleMDE from "simplemde";
import "/node_modules/simplemde/dist/simplemde.min.css";
import "./createPage.html";

/**
 * trimSlug function
 * for removing any whitespace in the page slug
 * @param {String} slug the slug of the page to be created
 * @return {String} the trimmed slug
 */
export const trimSlug = (slug) => {
  if (/\s/.test(slug)) {
    // It has any kind of whitespace
    return slug.split(" ")[0];
  }
  return slug;
};

let simplemde;
Template.staticPageTemplate.onRendered(() => {
  simplemde = new SimpleMDE({
    element: document.getElementById("simplemde"),
    placeholder: "Enter page content...",
    spellChecker: true,
    hideIcons: ["image"],
    autoDownloadFontAwesome: false,
    renderingConfig: {
      singleLineBreaks: false,
      codeSyntaxHighlighting: true
    }
  });
});

Template.staticPageTemplate.events({
  "submit .create-page-form": () => {
    event.preventDefault();
    const title = $("#page-title").val();
    const slug = trimSlug($("#page-slug").val());
    const content = $("#simplemde").val();
    const shopId = Reaction.shopId;
    const pageOwner = Meteor.user()._id;
    const createdAt = new Date();
    Meteor.call("createPage", title, slug, content, shopId, pageOwner, createdAt, (error) => {
      if (error) {
        Alerts.toast(error.message, "error", {
          autoHide: 1000
        });
      } else {
        $("#page-title").val("");
        $("#page-slug").val("");
        simplemde.value("");
        Alerts.toast("Page created sucessfully!", "success", {
          autoHide: 1000
        });
      }
    });
  }
});

