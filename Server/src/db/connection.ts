import { connect, disconnect } from "mongoose";

const connectToDatabase = async () => {
  try {
    await connect(process.env.MONGODB_URL || "");
  } catch (error) {
    console.log(error);
    throw new Error("Cannot Connect To MongoDB");
  }
};

const disconnectToDatabase = async () => {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Cannot Connect To MongoDB");
  }
};

export { connectToDatabase, disconnectToDatabase };
