import React from "react";
import Navbar from "./Navbar";
import Button from "./Button";

const Topbar = () => {
  return (
    <div className="fixed top-4 left-18 z-50 flex items-center gap-2">
      <Navbar />
      <Button variant="primary">Join Us Today</Button>
    </div>
  );
};

export default Topbar;
