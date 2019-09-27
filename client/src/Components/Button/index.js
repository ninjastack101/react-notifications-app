import React from "react";
import Button from "@material-ui/core/Button";

export default function ButtonComponent({ toggleState, action }) {
  return (
    <Button
      variant="contained"
      color="primary"
      className="btn btn-info"
      style={{ width: "200px" }}
      onClick={() => toggleState(action.type)}
    >
      {action.buttonText}
    </Button>
  );
}
