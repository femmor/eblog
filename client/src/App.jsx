import { Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import { UserAuthForm } from "./pages";
import { Toaster } from "react-hot-toast";
import { createContext, useEffect, useState } from "react";
import { getFromSession } from "./common/session";

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    const userInSession = getFromSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider
      value={{
        userAuth,
        setUserAuth,
      }}
    >
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/signin" element={<UserAuthForm type="sign in" />} />
          <Route path="/signup" element={<UserAuthForm type="sign up" />} />
        </Route>
      </Routes>
      <Toaster />
    </UserContext.Provider>
  );
};

export default App;
