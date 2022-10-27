import axios from "axios";
import React from "react";

const UnfollowButton = ({ accountId, className, children }) => {
  const handleUnfollow = async (event) => {
    try {
      await axios.post("/api/following", { accountId: accountId });
      event.target.blur();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className={className} onClick={handleUnfollow}>
      {children}
    </button>
  );
};

export default UnfollowButton;
