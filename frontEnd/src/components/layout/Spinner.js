import React, { Fragment } from "react";
import loader from "../../img/infinity.gif";

export default () => {
  return (
    <Fragment>
      <img
        src={loader}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </Fragment>
  );
};
