import React from "react";
import Navbar from "./Navbar";
import Button from "./Button";
import GithubStarButton from "./GithubStarButton";
import NotificationsButton from "./NotificationsButton";

const Topbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 w-full max-w-full z-50 overflow-hidden">
      <div className="flex items-center gap-4 px-4 py-3 h-20 w-full min-w-0 relative z-10">
        {/* Notifications Button */}
        <NotificationsButton className="shrink-0" />

        {/* Navbar - expands to fill available space */}
        <div className="flex-1 min-w-0">
          <Navbar />
        </div>

        {/* Join Us Button */}
        <Button variant="primary" className="shrink-0">
          Join Us Today
        </Button>

        {/* GitHub Star Button */}
        <GithubStarButton className="shrink-0" />
      </div>
    </div>
  );
};

export default Topbar;
