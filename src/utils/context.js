import React from "react";

const AuthAppContext = React.createContext();

let prj = {};

const AuthAppProvider = ({ children }) => {
  const [prjState, setprjState] = React.useState({});

  React.useEffect(() => {
    //TODO use a graphql call to hasura to get all details you need based on logged in user and / or the project they are viewing
    setprjState({ project_id: "ec214cf2-ba69-4d70-9bb6-43c91ad2fda7" });
  }, []);

  return (
    <AuthAppContext.Provider value={prjState}>
      {children}
    </AuthAppContext.Provider>
  );
};
export { AuthAppProvider, AuthAppContext };
