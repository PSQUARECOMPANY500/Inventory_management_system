import React, { useState } from "react";
// importing important components from material-ui
import {
  Typography,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormGroup,
  styled,
  Select,
  MenuItem,
} from "@mui/material";

import { saveQrData } from "../services/api";
import { useNavigate } from "react-router-dom";
// Using Styled Components to style the FormGroup, FormControl, Input, Button, Typography and FormLabel
const Container = styled(FormGroup)({
  width: "20%",
  "& > div": {
    marginTop: "0px",
  },
  gap: "20px",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  marginBottom: "20px",
  padding: "30px",
  margin: "5% auto 0 auto",
  display: "flex",
  flexDirection: "column",
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

const InputForm = styled(Input)({
  border: "1px solid rgb(105, 105, 105)",
  padding: "0px 5px",
});
const CustomDropdown = styled(Select)({
  border: "1px solid rgb(105, 105, 105)",
  padding: "0px 5px",
  height: "35px",
});

const CustomFormControl = styled(FormControl)({
  "& > div": {
    marginTop: "0px !important",
  },
  "& > button": {
    textTransform: "capitalize",
  },
});

const defaultvalue = {
  componentName: "1",
  receivedDate: "",
  quantity: "",
};

function GenerateQr() {
  const [data, setData] = useState(defaultvalue); // This is the state for the form data
  const [loading, setLoading] = useState(false); // This is the state for the loading
  const navigate = useNavigate(); // This is used for navigation between different routes
  const generateAndSaveCode = async () => {
    try {
      if (
        !data.componentName ||
        !data.receivedDate ||
        !data.quantity ||
        data.componentName === "1"
      ) {
        alert("Please fill in all the required fields.");
        return; // Exit if validation fails
      }
      setLoading(true);
      await saveQrData(data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <FormControl>
          <Typography textAlign="center" varient="h4" component="h1">
            <FormHeader>Generate QR Code</FormHeader>
          </Typography>
        </FormControl>
        <FormControl style={{ width: "90%" }}>
          <FormLabel style={{ marginBottom: "10px" }}>Name</FormLabel>
          <CustomDropdown
            name="componentName"
            required
            value={data.componentName}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          >
            <MenuItem disabled value="1">
              Select (C1-C5)
            </MenuItem>
            <MenuItem value="C1">C1</MenuItem>
            <MenuItem value="C2">C2</MenuItem>
            <MenuItem value="C3">C3</MenuItem>
            <MenuItem value="C4">C4</MenuItem>
            <MenuItem value="C5">C5</MenuItem>
          </CustomDropdown>
        </FormControl>
        <CustomFormControl style={{ width: "90%" }}>
          <FormLabel style={{ marginBottom: "10px" }}>Date</FormLabel>
          <InputForm
            // html input attribute
            name="receivedDate"
            type="date"
            required
            slotProps={{
              input: {
                min: "2023-011-07T00:00",
                max: new Date().toISOString().split("T")[0],
              },
            }}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: new Date(e.target.value).toISOString(),
              })
            }
          />
        </CustomFormControl>
        <CustomFormControl style={{ width: "90%" }}>
          <FormLabel style={{ marginBottom: "10px" }}>Quantity</FormLabel>
          <InputForm
            // html input attribute
            name="quantity"
            type="number"
            required
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
        </CustomFormControl>
        <CustomFormControl style={{ width: "90%" }}>
          {loading ? (
            <Button disabled>Generating QR...</Button> // Comment should be enclosed in curly braces
          ) : (
            <Button
              variant="contained"
              onClick={() => generateAndSaveCode()}
              style={{ backgroundColor: "rgb(0, 40, 132)", borderRadius: "0" }}
            >
              Generate QR
            </Button>
          )}
        </CustomFormControl>
      </Container>
    </>
  );
}

export default GenerateQr;
