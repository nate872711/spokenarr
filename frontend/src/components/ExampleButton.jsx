import React from "react";

export const ExampleButton = ({ label, onClick }) => {
  return (
    <button
      style={{
        backgroundColor: "#FF7E33",
        border: "none",
        borderRadius: "8px",
        color: "white",
        padding: "10px 20px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
