import { StaticPages } from "/lib/collections";
import { Template } from "meteor/templating";
import marked from "marked";
import { Router, Reaction } from "/client/api";
import SimpleMDE from "simplemde";
import { FlatButton } from "/imports/plugins/core/ui/client/components";
import { trimSlug } from "../../../../../../custom/isildur/client/template/createPage";

let pageId;
let simplemde;
Template.staticPageDisplay.onRendered(() => {
  simplemde = new SimpleMDE({
    element: document.getElementById("simplemde-edit"),
    hideIcons: ["image"],
    spellChecker: true,
    autoDownloadFontAwesome: false,
    renderingConfig: {
      singleLineBreaks: false,
      codeSyntaxHighlighting: true
    }
  });
});

Template.staticPageDisplay.helpers({
  pages(slug) {
    const page = StaticPages.find({slug}).fetch();
    const content = marked(page[0].content);
    pageId = page[0]._id;
    return ([{
      title: page[0].title,
      content: content,
      _id: page[0]._id,
      slug: page[0].slug
    }]);
  },
  EditButtonComponent() {
    return {
      component: FlatButton,
      label: "Update Changes",
      kind: "flat",
      className: "edit-icon",
      onClick() {
        event.preventDefault();
        const id = pageId;
        const title = $("#page-title").val();
        const slug = trimSlug($("#page-slug").val());
        const content = simplemde.value();
        const shopId = Reaction.shopId;
        Meteor.call("editPage", id, title, slug, content, shopId, (error) => {
          if (error) {
            Alerts.toast(error.message, "error", {
              autoHide: 1000
            });
          } else {
            const backdrop = document.querySelector(".modal-backdrop.fade.in");
            backdrop.hidden = true;
            Router.go("/");
            Alerts.toast("Page edited successfully", "success", {
              autoHide: 1000
            });
          }
        });
      }
    };
  },
  DeleteButtonComponent() {
    return {
      component: FlatButton,
      icon: "fa fa-trash-o",
      kind: "flat",
      tooltip: "Delete Page",
      className: "delete-icon",
      onClick() {
        Alerts.alert("Delete Page", "Do you want to delete this page? This action can not be undone.", "warning", () => {
          Meteor.call("deletePage", pageId, (error) => {
            if (error) {
              Alerts.toast(error.message, "error", {
                autoHide: 1000
              });
              // MyCollection.simpleSchema().messages(). The error type string is "notUnique" to catch unique error
            } else {
              Router.go("/");
              Alerts.toast("Page deleted sucessfully!", "success", {
                autoHide: 1000
              });
            }
          });
        });
      }
    };
  }
});

