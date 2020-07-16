import React from "react";

const AuthAppContext = React.createContext();
const prj = { prjId: "12345566" };
const AuthAppProvider = ({ children }) => (
  <AuthAppContext.Provider value={prj}>{children}</AuthAppContext.Provider>
);
export { AuthAppProvider, AuthAppContext };
