import React from "react";

interface SpinnerProps {
  message?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ message = "Carregando..." }) => {
  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};
