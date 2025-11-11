import React from "react";
import { Box } from "@mui/material";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        bgcolor: "transparent",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
      }}
    >
      <NavBar />
      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          marginTop: { xs: "70px", sm: "80px" },
          padding: 0,
          overflowX: "hidden",
        }}
      >
        {children || <Outlet />}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
