import { Button } from "@material-ui/core";
import React from "react";
import { logout } from "../api/Auth";

export default (props) => {
  const { user } = props;

  return (
    <div>
      <h1>Home</h1>
      <p>{JSON.stringify(user)}</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
