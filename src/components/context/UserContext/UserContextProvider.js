import { React, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

// eslint-disable-next-line arrow-body-style
// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  const value = {
    user,
    setUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
