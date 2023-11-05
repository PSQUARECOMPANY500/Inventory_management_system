// importing mongoose to connect to MongoDB

import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@inventoy-app.mbrt8nb.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error in connecting to the database", error);
  }
};

export default Connection;
