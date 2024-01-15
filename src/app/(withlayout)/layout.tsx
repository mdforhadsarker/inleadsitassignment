"use client";

import { useState } from "react";
import SideBar from "../components/Sidebar";
import ProductList from "./products/page";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div
      style={{
        width: "1257px",
        display: "flex",
        justifyContent: "flex-start",
        margin: "0 auto",
      }}
    >
      <SideBar onSearchTermChange={setSearchTerm} />
      <ProductList searchTerm={searchTerm} />
      {children}
    </div>
  );
};

export default DashboardLayout;
