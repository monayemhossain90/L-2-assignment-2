import mongoose from "mongoose";
import configs from "./app/configs";
import app from "./app";

async function main() {
  try {
    await mongoose.connect(configs.mongo_url as string);
    app.listen(configs.port, () => {
      console.log(`Server is running on port ${configs.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
