import User from "../models/user-schema.js";
import Qrdata from "../models/Qrdata-schema.js";
import jwt from "jsonwebtoken";

export const registerNewUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);

  try {
    await newUser.save(); // Saving the user to the database
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// defining the token verify middleware
export function verify(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, "jwt-secret-key", (err, valid) => {
      if (err) {
        res.status(401).json({ message: "Please Provide Valid Token" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

export const verifyToken = async (req, res) => {
  res.status(200).json({ message: "Valid Token" });
};

export const loginUser = async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne({ email: req.body.email });
    if (user && user.password === req.body.password) {
      jwt.sign(
        { user },
        "jwt-secret-key",
        { expiresIn: "2h" },
        (err, token) => {
          if (err) {
            res.status(500).json({ message: err.message });
          }
          res.status(200).json({ user, auth: token });
        }
      );
    } else {
      res.status(404).json({ message: "Invalid Credentials" });
    }
  }
};

export const saveQrData = async (req, res) => {
  const data = req.body;
  const newData = new Qrdata(data);
  try {
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getQrData = async (req, res) => {
  try {
    const dataResponse = await Qrdata.find({});
    res.status(200).json(dataResponse);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateQrData = async (req, res) => {
  const { id } = req.body;
  try {
    const currentDate = new Date();
    await Qrdata.findOneAndUpdate(
      { _id: id },
      { $inc: { dispatchedQuantity: 1 }, dispatchedDate: currentDate }
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getQrDataInfo = async (req, res) => {
  const { id } = req.body;
  try {
    const dataResponse = await Qrdata.findOne({ _id: id });
    res.status(200).json(dataResponse);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEditData = async (req, res) => {
  const { id } = req.body;
  try {
    const dataResponse = await Qrdata.findOne({ _id: id });
    res.status(200).json(dataResponse);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateEditData = async (req, res) => {
  const { _id, componentName, receivedDate, quantity } = req.body;
  try {
    await Qrdata.findOneAndUpdate(
      { _id: _id },
      {
        componentName: componentName,
        receivedDate: receivedDate,
        quantity: quantity,
      }
    );
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteQrData = async (req, res) => {
  const { id } = req.params;
  try {
    await Qrdata.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
