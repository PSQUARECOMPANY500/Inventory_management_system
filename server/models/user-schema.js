import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

// Creating Schema for Registeration
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});



// Creating the user model
const user = mongoose.model("user", userSchema);



// Exporting the user model
export default user;
