import React, { useState } from "react";
import {
  Typography,
  FormControl,
  Input,
  Button,
  FormGroup,
  styled,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { loginUserData } from "../services/api";

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
  width: "100%",
  padding: "0px 5px",
  textDecoration: "none",
  "&:focus": {
    outline: "none",
  },
});

const defaultvalue = {
  email: "",
  password: "",
};

function Login() {
  const [userData, setuserData] = useState(defaultvalue);

  const navigate = useNavigate();
  const onValueChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const loginButtonHandle = async () => {
    const response = await loginUserData(userData);
    if (response.status === 200) {
      setuserData(defaultvalue);
      localStorage.setItem("auth", response.data.auth);
      // storing user data in local storage and converting it into string
      localStorage.setItem("user", JSON.stringify(response.data.user));

      localStorage.setItem("count", "1"); // setting count to 1 for the first time
      navigate("/", { state: "loggedIn" });
    } else {
      alert("Invalid Credentials");
    }
  };
  return (
    <>
      <Container>
        <FormControl>
          <Typography textAlign="center" varient="h4" component="h1">
            <FormHeader>Sign in</FormHeader>
          </Typography>
          <CustomTypo varient="body-sm">Welcome, login to continue</CustomTypo>
        </FormControl>
        <FormControl style={{ width: "90%" }}>
          <InputForm
            // html input attribute
            name="email"
            type="email"
            onChange={(e) => onValueChange(e)}
            placeholder="Email"
          />
        </FormControl>
        <FormControl style={{ width: "90%" }}>
          <InputForm
            // html input attribute
            name="password"
            type="password"
            onChange={(e) => onValueChange(e)}
            placeholder="password"
          />
        </FormControl>
        <FormControl style={{ width: "90%" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "rgb(0, 40, 132)", borderRadius: "0" }}
            onClick={() => loginButtonHandle()}
          >
            Sign In
          </Button>
        </FormControl>
        <CustomTypo fontSize="sm" sx={{ alignSelf: "center" }}>
          Don&apos;t have an account? <Link to="/register">&nbsp;Register</Link>
        </CustomTypo>
      </Container>
    </>
  );
}

export default Login;
