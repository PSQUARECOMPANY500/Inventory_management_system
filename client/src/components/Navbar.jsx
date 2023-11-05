import React, { useEffect, useState } from "react";

// importing important components from material-ui
import { AppBar, Toolbar, styled } from "@mui/material";

//  NavLink is used to navigate between different routes
import { NavLink, useNavigate } from "react-router-dom";

// Using Styled Components to style the AppBar, Toolbar, Buttons and Tabs
const Home = styled(AppBar)({
  backgroundColor: "#fff",
  color: "rgb(0, 40, 132)",
  height: "55px",
  alignItems: "center",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  padding: "10px 50px",
  fontSize: "1.2rem",
  whiteSpace: "nowrap",
});

const Navbars = styled(Toolbar)({
  display: "flex",
  alignItems: "center",
  // justifyContent: "space-evenly",
});

const RightAlignedNavbars = styled(Navbars)({
  justifyContent: "flex-end",
});

const Buttons = styled(NavLink)({
  margin: "0 10px",
  borderRadius: "4px",
  textDecoration: "none",
  color: "inherit",
  padding: "6px 30px",
  fontSize: "14px",
  border: "0.5px solid rgb(0, 40, 132)",
  letterSpacing: "0.06253em",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgb(0, 40, 132)",
    color: "#fff",
    transition: "all 0.5s ease-in-out",
  },
});

const Tabs = styled(NavLink)({
  margin: "0px 30px",
  borderBottom: "2px solid transparent",
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer",
  "&:hover": {
    color: "rgb(0, 40, 132)",
    borderBottomColor: "rgb(0, 40, 132)",
    transition: "all 0.2s ease-in-out",
  },
});

function Navbar() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login");
      return;
    }
    setAuthorized(true);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    setAuthorized(false);
    navigate("/login");
  };
  return (
    <Home position="static" elevation={0}>
      <Navbars>
        <Tabs to="/">Inventory management system</Tabs>
      </Navbars>
      <Navbars>
        <Tabs to="/generate-qr-code">Generate QR Code</Tabs>
        <Tabs to="/scan-qr-code">Scan QR Code</Tabs>
      </Navbars>
      <RightAlignedNavbars>
        {authorized ? (
          <Buttons onClick={logoutHandler}>Logout</Buttons>
        ) : (
          <>
            <Buttons to="/login">Login</Buttons>
            <Buttons to="/register">Register</Buttons>
          </>
        )}
      </RightAlignedNavbars>
    </Home>
  );
}

export default Navbar;
