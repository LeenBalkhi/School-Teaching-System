import DBLoader from "./loaders/database";
import ExpressLoader from "./loaders/express";

const start = async () => {
  await DBLoader();
  ExpressLoader.start();
};
start().catch((error) => {
  console.log("loading error", error);
});
