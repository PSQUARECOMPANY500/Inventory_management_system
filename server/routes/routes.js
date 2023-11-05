import express from "express";

import {
  registerNewUser,
  saveQrData,
  getQrData,
  updateQrData,
  getQrDataInfo,
  getEditData,
  updateEditData,
  deleteQrData,
  loginUser,
  verifyToken,
  verify,
} from "../controller/user-controller.js";

// importing the controllers to handle the routes
const routes = express.Router();

// defining the routes

routes.post("/api/register", registerNewUser);

routes.post("/api/loginuser", loginUser);

routes.post("/api/saveQrData", saveQrData);

routes.get("/api/getQrData", getQrData);

routes.post("/api/updateQrData", updateQrData);

routes.post("/api/getQrDataInfo", getQrDataInfo);

routes.post("/api/getEditData", getEditData);

routes.post("/api/updateEditData/:id", updateEditData);

routes.delete("/api/deleteQrData/:id", deleteQrData);

routes.get("/api/verifytoken", verify, verifyToken);

// exporting the routes

export default routes;
