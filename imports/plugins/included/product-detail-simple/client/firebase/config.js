import dotenv from "dotenv";

dotenv.config();

config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: "reaction-commerce-3618c.appspot.com",
  messagingSenderId: process.env.messagingSenderId
};

export default config;
