import React, { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { updateQrData, getQrDataInfo, verifyToken } from "../services/api.js";

import QrScanner from "qr-scanner";

import QrReader from "react-qr-scanner";
import {
  Typography,
  FormControl,
  Button,
  FormGroup,
  styled,
} from "@mui/material";

const Container = styled(FormGroup)({
  width: "40%",
  height: "100%",
  "& > div": {
    marginTop: "0px",
  },
  gap: "20px",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  marginBottom: "20px",
  padding: "30px",
  margin: "5% auto 0 auto",
  display: "flex !important",
  flexDirection: "column !important",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #ccc",
});

const FormHeader = styled("p")({
  fontSize: "20px",
  marginBottom: "10px",
  color: "rgb(0, 40, 132)",
  fontWeight: "500",
});

const CustomFormControl = styled(FormControl)({
  "& > div": {
    marginTop: "0px !important",
  },
  "& > button": {
    textTransform: "capitalize",
  },
});

function ScanQr() {
  const qrRef = useRef(null); // to access the QR code reader
  const qrWebRef = useRef(null);
  // const [scanResult, setScanResult] = useState(""); // to store the result of the QR code scan
  const [file, setFile] = useState(null);

  const [data, setData] = useState(false);

  const [webdata, setWebData] = useState(false);

  const [showWebCam, setShowWebCam] = useState(false); // State to control the visibility of the web camera

  const navigate = useNavigate();

  const handleClick = async () => {
    if (!localStorage.getItem("auth")) {
      navigate("/login");
      return;
    }
    const response = await verifyToken(localStorage.getItem("auth"));
    if (response?.data?.message === "Valid Token") {
      qrRef.current.click();
    } else {
      alert(response?.data?.message);
    }
  };

  const handleWebCamClick = async () => {
    if (!localStorage.getItem("auth")) {
      navigate("/login");
      return;
    }
    const response = await verifyToken(localStorage.getItem("auth"));
    if (response?.data?.message === "Valid Token") {
      setShowWebCam(true);
    } else {
      alert(response?.data?.message);
    }
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const result = await QrScanner.scanImage(file);
    const result1 = JSON.parse(result);
    // console.log(result1);
    const qrInfo = await getQrDataInfo(result1);

    if (qrInfo?.data.quantity <= qrInfo?.data.dispatchedQuantity) {
      setData(true);
      return;
    }
    setData(false);
    if (result1.id === undefined) return;
    updateQrData(result1);
    navigate("/");
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = async (result) => {
    if (result) {
      setShowWebCam(false);
      const result1 = JSON.parse(result.text);
      // console.log(result1);
      const qrInfo = await getQrDataInfo(result1);

      if (qrInfo?.data.quantity <= qrInfo?.data.dispatchedQuantity) {
        setWebData(true);
        return;
      }
      setWebData(false);
      if (result1.id === undefined) return;
      updateQrData(result1);
      navigate("/");
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <Container>
        <FormControl>
          <Typography textAlign="center" varient="h4" component="h1">
            <FormHeader>Upload QR Code</FormHeader>
          </Typography>
        </FormControl>

        <CustomFormControl
          style={{
            width: "90%",
            display: "flex",
            height: "400px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              color: "red",
            }}
          >
            {data ? "Qrcode's Item already dispatched" : ""}
          </h3>
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="qr code"
              style={{
                width: "175px",
                height: "175px",
                marginBottom: "50px",
              }}
            />
          )}
          <input
            style={{ display: "none" }}
            ref={qrRef}
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={handleChange}
          />
          <Button
            variant="contained"
            onClick={handleClick}
            style={{
              backgroundColor: "rgb(0, 40, 132)",
              borderRadius: "0",
              width: "100%",
              position: "absolute",
              bottom: "0",
            }}
          >
            Upload
          </Button>
        </CustomFormControl>
      </Container>
      <Container>
        <FormControl>
          <Typography textAlign="center" varient="h4" component="h1">
            <FormHeader>Scan QR Code</FormHeader>
          </Typography>
        </FormControl>

        <CustomFormControl
          style={{
            width: "90%",
            display: "flex",
            height: "400px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              color: "red",
              height: "30%",
              position: "absolute",
              top: "0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {webdata ? "Qrcode's Item already dispatched" : ""}
          </h3>
          {showWebCam ? (
            <QrReader
              ref={qrWebRef}
              delay={300}
              style={{ width: "90%", height: "90%", marginBottom: "50px" }}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
            />
          ) : (
            "Click below to open camera"
          )}
          <Button
            onClick={handleWebCamClick}
            variant="contained"
            style={{
              backgroundColor: "rgb(0, 40, 132)",
              borderRadius: "0",
              width: "100%",
              position: "absolute",
              bottom: "0",
            }}
          >
            Enable WebCam
          </Button>
        </CustomFormControl>
      </Container>
    </div>
  );
}

export default ScanQr;
