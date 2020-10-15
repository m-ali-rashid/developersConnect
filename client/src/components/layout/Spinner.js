import React, { Fragment } from "react";
import loader from "../../img/spinner.gif";

export default () => {
  return (
    <Fragment>
    <div className="my-2 py-1"></div>
      <img
        src={loader}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </Fragment>
  );
};
