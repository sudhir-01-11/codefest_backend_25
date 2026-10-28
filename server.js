import { app } from "./app.js";
import { backendUrl } from "./config/constants.js";
import { connectDB } from "./config/database.js";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on ${backendUrl} in ${process.env.NODE_ENV} mode`
      );
    });
  } catch (error) {
    console.error("Unable to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();
