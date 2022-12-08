import { Button } from "@material-ui/core";
import React from "react";
import { logout } from "../api/Auth";
import MenuAppBar from "../components/MenuAppBar";

export default function Home(props) {
  const { user } = props;

  return (
    <MenuAppBar title="Home" user={user}>
      <div>
        <h1>Home</h1>
        <p>{JSON.stringify(user)}</p>
        <Button onClick={logout}>Logout</Button>
      </div>
    </MenuAppBar>
  );
};
