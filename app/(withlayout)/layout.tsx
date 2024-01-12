"use client";

import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

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
      {/* <Header /> */}
      <SideBar />
      {children}
    </main>
  );
};

export default DashboardLayout;
