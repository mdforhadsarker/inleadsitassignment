"use client";
import { useState } from "react";
import SideBar from "../components/Sidebar";
// import {
//   ServerStyleSheet,
//   StyleSheetManager,
// } from 'styled-components';



const DashboardLayout = ({ children }: { children: React.ReactNode }) => {


  return (
    <div
      style={{
        width: "1257px",
        // backgroundColor: "red",
        display: "flex",
        justifyContent: "flex-start",
        // flexDirection: "row",
        margin: "0 auto",
      }}
    >
      <SideBar />
      {children}
    </div>
  );
};

export default DashboardLayout;
