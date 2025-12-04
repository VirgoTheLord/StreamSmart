import React from "react";
import Navbar from "./Navbar";
import Button from "./Button";
import GithubStarButton from "./GithubStarButton";

const Topbar = () => {
  return (
    <div className="fixed top-4 left-18 w-full z-50">
      <div className="flex items-center gap-2.5">
        <Navbar />
        <Button variant="primary">Join Us Today</Button>
      </div>
    </div>
  );
};

export default Topbar;
