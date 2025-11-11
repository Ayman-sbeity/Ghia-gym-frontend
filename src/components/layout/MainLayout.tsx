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
        bgcolor: "white",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <NavBar />
      <Box
        sx={{
          flex: 1,
          width: "100%",
          margin: 0,
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
