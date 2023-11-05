// importing axios to make HTTP requests
import axios from "axios";

const URL = "http://localhost:5000";

// exporting a function that will make a Post request to the Register API

export const registerUser = async (data) => {
  try {
    return await axios.post(`${URL}/api/register`, data);
  } catch (error) {
    console.log("Error in login API", error);
  }
};

export const loginUserData = async (data) => {
  try {
    return await axios.post(`${URL}/api/loginuser`, data);
  } catch (error) {
    console.log("Error in login API", error);
  }
};

// function to save data to the database
export const saveQrData = async (data) => {
  try {
    return await axios.post(`${URL}/api/saveQrData`, data);
  } catch (error) {
    console.log("Error in saveQrData API", error);
  }
};

export const getallQrData = async () => {
  try {
    return await axios.get(`${URL}/api/getQrData`);
  } catch (error) {
    console.log("Error in getQrData API", error);
  }
};

export const updateQrData = async (data) => {
  try {
    return await axios.post(`${URL}/api/updateQrData`, data);
  } catch (error) {
    console.log("Error in updateQrData API", error);
  }
};

export const getQrDataInfo = async (data) => {
  try {
    return await axios.post(`${URL}/api/getQrDataInfo`, data);
  } catch (error) {
    console.log("Error in getQrDataInfo API", error);
  }
};

export const getEditData = async (data) => {
  try {
    return await axios.post(`${URL}/api/getEditData`, data);
  } catch (error) {
    console.log("Error in getEditData API", error);
  }
};

export const updateEditData = async (data, param) => {
  try {
    return await axios.post(`${URL}/api/updateEditData/${param}`, data);
  } catch (error) {
    console.log("Error in updateEditData API", error);
  }
};

export const deleteQrData = async (id) => {
  try {
    return await axios.delete(`${URL}/api/deleteQrData/${id}`);
  } catch (error) {
    console.log("Error in deleteQrData API", error);
  }
};

export const verifyToken = async (tokendata) => {
  try {
    return await axios.get(`${URL}/api/verifytoken`,{
      headers:{
        authorization: `bearer ${tokendata}`
      }
    });
  } catch (error) {
    console.log("Error in verifyToken API", error);
  }
};
