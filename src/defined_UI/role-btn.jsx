import React from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/roleContext"; // adjust path if needed

const RoleButton = () => {
  const { role, loading } = useRole();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!role) {
      navigate("/role");  // if role not set
    } else if (role === "student") {
      navigate("/dashboard");
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/"); // fallback
    }
  };

  if (loading) {
    return (
      <button
        disabled
        className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Go
    </button>
  );
};

export default RoleButton;
