import React from "react";

const UnfollowButton = ({ accountId, className, children }) => {
  const handleUnfollow = (event) => {
    event.target.blur();
    console.log(`Unfollow ${accountId}`);
  };
  return (
    <button className={className} onClick={handleUnfollow}>
      {children}
    </button>
  );
};

export default UnfollowButton;
