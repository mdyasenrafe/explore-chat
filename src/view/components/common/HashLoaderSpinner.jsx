import React, { CSSProperties } from "react";
import { css } from "@emotion/react";
import { HashLoader } from "react-spinners";

export const HashLoaderSpinner = ({ color, loading }) => {
  const override = {
    height: "100vh",
    textAlign: "center",
  };

  return (
    <div className="flex justify-center items-center">
      <HashLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={100}
      />
    </div>
  );
};
