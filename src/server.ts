import mongoose from "mongoose";
import app from "./app";
import config from "./app/modules/config/index";

async function main() {
  try {
    await mongoose.connect(config.db_uri!);
    console.log("✅ Database Connected Successfully!");

    app.listen(config.port, () => {
      console.log(`✅ Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();