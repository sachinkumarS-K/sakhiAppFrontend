import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 ">
      <p className="text-sm md:text-base">
        &copy; {new Date().getFullYear()} Women’s Safety & Wellness Hub. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
