"use client";

import SideBar from "../components/Sidebar";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {


  return (
    <main
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
    </main>
  );
};

export default DashboardLayout;
