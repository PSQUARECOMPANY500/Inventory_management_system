import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  styled,
} from "@mui/material";

import EditImg from "../assets/images/pen-solid.svg";
import deleteImg from "../assets/images/trash-can-solid.svg";

import { useLocation } from "react-router-dom";
import QRcode from "qrcode";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { getallQrData, deleteQrData, verifyToken } from "../services/api.js";

import { useNavigate } from "react-router-dom";

const HomeTable = styled(Table)({
  backgroundColor: "#fff",
  color: "rgb(0, 40, 132)",
  border: " 1px solid rgb(0, 40, 132)",
  alignItems: "center",
  borderRadius: "4px",
  padding: "10px 50px",
  fontSize: "1.2rem",
  whiteSpace: "nowrap",
  "& > th": {
    color: "rgb(0, 40, 132) !important",
  },
});
const HomeTableRow = styled(TableRow)({
  "& > th": {
    color: "rgb(0, 40, 132)",
    fontSize: "14px",
    textAlign: "center",
    fontWeight: "bold",
  },
  "& > td": {
    fontSize: "14px",
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
});

function Homepage() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();

  const [qrCodeUrls, setQRCodeUrls] = useState([]);
  useEffect(() => {
    let myState = location.state;
    if (myState === "loggedIn" && localStorage.getItem("count") === "1") {
      localStorage.setItem("count", "0");
      window.location.reload();
    }
    getallData();
  }, []);

  const getallData = async () => {
    let response = await getallQrData();
    setData(response?.data);
  };

  // generate the QR code images
  useEffect(() => {
    async function generateQRCodeImages() {
      const urls = await Promise.all(
        data.map(async (item) => {
          const qrCodeDataURL = await generateQRCode(item);
          return qrCodeDataURL;
        })
      );
      setQRCodeUrls(urls);
    }

    generateQRCodeImages();
  }, [data]);

  const EditData = async (id) => {
    if (!localStorage.getItem("auth")) {
      navigate("/login");
      return;
    }
    const response = await verifyToken(localStorage.getItem("auth"));
    if (response?.data?.message === "Valid Token") {
      navigate("/edit/" + id);
    } else {
      alert("You are not authorized to edit the data");
    }
  };
  const deleteData = async (id) => {
    if (!localStorage.getItem("auth")) {
      navigate("/login");
      return;
    }
    const response = await verifyToken(localStorage.getItem("auth"));
    if (response?.data?.message === "Valid Token") {
      deleteQrData(id);
      getallData();
    } else {
      alert("You are not authorized to delete the data");
    }
  };

  const generateQRCode = async (data) => {
    var userData = {
      id: data._id,
      componentName: data.componentName,
      quantity: data.quantity,
      dispatchedQuantity: data.dispatchedQuantity,
      receivedDate: data.receivedDate,
    };
    try {
      let Qrimagedata = await QRcode.toDataURL(JSON.stringify(userData));
      return Qrimagedata;
    } catch (error) {
      console.log("Error generating QR Code", error);
    }
  };
  return (
    <div style={{ padding: "60px 50px" }}>
      <HomeTable>
        <TableHead>
          <HomeTableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date Received/Quantity</TableCell>
            <TableCell>Date Dispatched/Quantity</TableCell>
            <TableCell>Pending Items</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>QR Code (Click to download)</TableCell>
            <TableCell>Admin Panel</TableCell>
          </HomeTableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, index) => {
            return (
              <HomeTableRow key={item._id}>
                <TableCell>{item.componentName}</TableCell>
                <TableCell>
                  {moment(item.receivedDate).format("DD/MM/YYYY")} /{" "}
                  {item.quantity}
                </TableCell>
                <TableCell>
                  {item.dispatchedDate === null
                    ? "---------"
                    : moment(item.dispatchedDate).format("DD/MM/YYYY") +
                      " / " +
                      item.dispatchedQuantity}
                </TableCell>
                <TableCell>{item.quantity - item.dispatchedQuantity}</TableCell>
                <TableCell>
                  {item.quantity - item.dispatchedQuantity === 0
                    ? "Dispactched"
                    : "Pending"}
                </TableCell>
                <TableCell>
                  {qrCodeUrls[index] ? (
                    <a href={qrCodeUrls[index]} download>
                      <img
                        src={qrCodeUrls[index]}
                        alt="QR Code"
                        style={{ width: "175px", height: "175px" }}
                      />
                    </a>
                  ) : (
                    "QR Code not available"
                  )}
                </TableCell>
                <TableCell>
                  <img
                    src={EditImg}
                    alt="React Logo"
                    style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "10px",
                    }}
                    onClick={() => EditData(item._id)}
                  />
                  <img
                    src={deleteImg}
                    alt="React Logo"
                    style={{
                      height: "20px",
                      width: "20px",
                      marginLeft: "10px",
                    }}
                    onClick={() => deleteData(item._id)}
                  />
                </TableCell>
              </HomeTableRow>
            );
          })}
        </TableBody>
      </HomeTable>
    </div>
  );
}

export default Homepage;
