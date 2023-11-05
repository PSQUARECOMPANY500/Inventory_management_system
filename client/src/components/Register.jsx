import React, { useState } from "react";
import {
  Typography,
  FormControl,
  Input,
  Button,
  FormGroup,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { registerUser } from "../services/api";

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
  fontSize: "32px",
  marginBottom: "10px",
  color: "rgb(0, 40, 132)",
  fontWeight: "500",
});

const CustomTypo = styled(Typography)({
  marginTop: "0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 300,
  color: "rgb(105, 105, 105)",
  fontSize: "16px",
});

const InputForm = styled(Input)({
  border: "1px solid rgb(105, 105, 105)",
  padding: "0px 5px",
});
const defaultvalue = {
  name: "",
  email: "",
  password: "",
};

function Register() {
  // defining the useState with default object.
  const [userData, setuserData] = useState(defaultvalue);

  const [register, setRegister] = useState(false);

  const onValueChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  // defining function to handle register button

  const registerUserData = async () => {
    const response = await registerUser(userData);
    if (response.status === 201) {
      setRegister(true);
      return;
    }
    setRegister(false);
  };
  return (
    <>
      <Container>
        <FormControl>
          <Typography textAlign="center" varient="h4" component="h1">
            <FormHeader>Register</FormHeader>
          </Typography>
          <CustomTypo varient="body-sm">
            Create Your Free Account Now !
          </CustomTypo>
          <h4 style={{ color: "red" }}>
            {register ? "Account created ! Login Now" : ""}
          </h4>
        </FormControl>
        <FormControl style={{ width: "90%" }}>
          <InputForm
            // html input attribute
            name="name"
            type="text"
            required
            placeholder="Name"
            onChange={(e) => onValueChange(e)}
          />
        </FormControl>
        <FormControl style={{ width: "90%" }}>
          <InputForm
            // html input attribute
            name="email"
            type="email"
            required
            placeholder="Email"
            onChange={(e) => onValueChange(e)}
          />
        </FormControl>
        <FormControl style={{ width: "90%" }}>
          <InputForm
            // html input attribute
            name="password"
            type="password"
            required
            placeholder="password"
            onChange={(e) => onValueChange(e)}
          />
        </FormControl>
        <FormControl style={{ width: "90%" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "rgb(0, 40, 132)", borderRadius: "0" }}
            onClick={() => registerUserData()}
          >
            Register
          </Button>
        </FormControl>
        <CustomTypo fontSize="sm" sx={{ alignSelf: "center" }}>
          Already have an account? <Link to="/login">&nbsp;Login</Link>
        </CustomTypo>
      </Container>
    </>
  );
}

export default Register;
