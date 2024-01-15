"use client";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        width: "1257px",
        display: "flex",
        justifyContent: "flex-start",
        margin: "0 auto",
      }}
    >
    
      {children}
    </div>
  );
};

export default DashboardLayout;
