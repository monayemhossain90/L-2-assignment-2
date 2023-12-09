import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  mongo_url: process.env.MONGO_URL,
  port: process.env.PORT,
  bcrypt_solts_round: process.env.BCRYPT_SOLTS_ROUND,
};
