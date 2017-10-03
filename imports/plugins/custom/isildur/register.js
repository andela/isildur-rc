import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Isildur Static Page Management",
  name: "isildur-static-page-management",
  icon: "fa fa-cubes",
  autoEnable: true,
  registry: [{
    route: "pages",
    name: "static-pages",
    template: "staticPageTemplate",
    workflow: "coreProductWorkflow"
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "coreProductWorkflow",
    collection: "StaticPages",
    theme: "default",
    enabled: true,
    structure: {
      template: "staticPageTemplate",
      layoutHeader: "layoutHeader",
      layoutFooter: "layoutFooter",
      notFound: "notFound",
      dashboardHeader: "",
      dashboardControls: "productDetailDashboardControls",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
