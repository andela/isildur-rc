import { Reaction } from "/client/api";
import introJs from "intro.js";

const tour = introJs.introJs();

const userTour = [
  {
    intro: `<h4 class="text-center">Welcome to Isildur Reaction Commerce</h4> <hr />
    <p class="text-center">This is the ultimate eCommerce platform. The only eCommerce platform where you can have the best shopping experience.</p>
    `
  },
  {
    element: ".product-grid",
    intro: `<h4 class="text-center">Products</h4> <hr />
    <p class="text-center">You can find all featured products here. From here, you can view any product.</p>
    `
  },
  {
    element: ".search",
    intro: `<h4 class="text-center">Advanced Search</h4> <hr />
    <p class="text-center">With a plethora of products, you can search for even specific products here. You can filter your search based on your criteria.</p>
    `
  },
  {
    element: ".languages",
    intro: `<h4 class="text-center">Multiple Languages</h4> <hr />
    <p class="text-center">English is not your thing? Never mind, we've got you covered. Click here to select your preferred language. Arigato!</p>
    `
  },
  {
    element: ".accounts",
    intro: `<h4 class="text-center">Account Management</h4> <hr />
    <p class="text-center">Want to sign in or sign out? Here's where you can do that. Checkout your profile when you're signed in here too.</p>
    `
  },
  {
    element: ".cart",
    intro: `<h4 class="text-center">Product Cart</h4> <hr />
    <p class="text-center">As you shop, you can add all your products to your cart. When you're done, find them all here, so  you can easily pay for them.</p>
    `
  },
  {
    element: ".tour",
    intro: `<h4 class="text-center">Retake Tour</h4> <hr />
    <p class="text-center">You can always come back here and re-take this tour. We're nice like that.</p>
    `
  },
  {
    intro: `<h4 class="text-center">Enjoy your eCommerce experience.</h4> <hr />
    <p class="text-center">Now that you know your way, go forth and shop right.</p>
    `
  }
];

const vendorTour = [
  {
    intro: `<h4 class="text-center">Welcome to Isildur Reaction Commerce</h4> <hr />
    <p class="text-center">This is the ultimate eCommerce solution. The only eCommerce solution you'll ever need.
    Glad to have you as a vendor, here's how to use the app</p>
    `
  },
  {
    element: ".product-grid",
    intro: `<h4 class="text-center">Products</h4> <hr />
    <p class="text-center">You can find all featured products here. From here, you can view any product.</p>
    `
  },
  {
    element: ".search",
    intro: `<h4 class="text-center">Advanced Search</h4> <hr />
    <p class="text-center">With a plethora of products, you can search for even specific products here. You can filter your search based on your criteria.</p>
    `
  },
  {
    element: ".languages",
    intro: `<h4 class="text-center">Multiple Languages</h4> <hr />
    <p class="text-center">English is not your thing? Never mind, we've got you covered. Click here to select your preferred language. Arigato!</p>
    `
  },
  {
    element: ".accounts",
    intro: `<h4 class="text-center">Account Management</h4> <hr />
    <p class="text-center">Here's your gateway to managing your account. You can find your profile, dashboard, orders and account here.
    You can also add products from the dropdown.</p>
    `
  },
  {
    element: ".cart",
    intro: `<h4 class="text-center">Product Cart</h4> <hr />
    <p class="text-center">As you shop, you can add all your products to your cart. When you're done, find them all here, so  you can easily pay for them.</p>
    `
  },
  {
    element: ".admin-controls-menu",
    intro: `<h4 class="text-center">Admin Control Menu</h4> <hr />
    <p class="text-center">Here's your admin control menu from where you can manage your awesome store.</p>
    `
  },
  {
    element: "i.rui.font-icon.icon-reaction-logo",
    intro: `<h4 class="text-center">Dashboard</h4> <hr />
    <p class="text-center">Click here to go to your store's dashboard. You'll find everything you need to manage your store here.</p>
    `
  },
  {
    element: "i.rui.font-icon.fa.fa-sun-o",
    intro: `<h4 class="text-center">Orders</h4> <hr />
    <p class="text-center">Click here to go to your store's orders. You can see all new, pending and completed orders here.</p>
    `
  },
  {
    element: "i.rui.font-icon.fa.fa-users",
    intro: `<h4 class="text-center">Account Management</h4> <hr />
    <p class="text-center">Click here to go to see your store's users. You can see all your users, and manage their permissions here.</p>
    `
  },
  {
    element: "i.rui.font-icon.fa.fa-plus",
    intro: `<h4 class="text-center">Create Content</h4> <hr />
    <p class="text-center">Click here to go to add content to your store. You can add new products and pages here.</p>
    `
  },
  {
    element: ".tour",
    intro: `<h4 class="text-center">Retake Tour</h4> <hr />
    <p class="text-center">You can always come back here and re-take this tour. We're nice like that.</p>
    `
  },
  {
    intro: `<h4 class="text-center">Enjoy your eCommerce experience.</h4> <hr />
    <p class="text-center">Now that you know your way, go forth and make for yourself an awesome eCommerce store.</p>
    `
  }
];

const takeTour = () => {
  let displayTour;
  if (Reaction.hasPermission("admin")) {
    displayTour = vendorTour;
  }
  if (Reaction.hasPermission("account/profile") && !Reaction.hasPermission("admin")) {
    displayTour = userTour;
  }
  tour.setOptions({
    showBullets: true,
    showProgress: true,
    scrollToElement: true,
    showStepNumbers: false,
    tooltipPosition: "auto",
    steps: displayTour
  });
  if (Reaction.hasPermission("account/profile")) {
    tour.start();
    localStorage.setItem("takenTour", true);
  }
};

export default takeTour;
