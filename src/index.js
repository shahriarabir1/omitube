import connectDB from "./db/index.js";
import { app } from "./app.js";
import environment from "./environment/environment.js";

connectDB()
  .then(() => {
    app.listen(environment.port, () => {
      console.log(`PORT is listening at ${environment.port}`);
    });
    app.on("Error", (error) => {
      throw error;
    });
  })
  .catch((err) => {
    console.error("Mongodb Connection error", err);
  });
