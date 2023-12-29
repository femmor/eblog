import { Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import { Editor, UserAuthForm } from "./pages";
import { Toaster } from "react-hot-toast";
import { createContext, useEffect, useState } from "react";
import { getFromSession } from "./common/session";

export const AppContext = createContext({});

const blogStructure = {
  title: "",
  banner: "",
  content: "",
  tags: [],
  desc: "",
  author: {
    personalInfo: {},
  },
};

const App = () => {
  const [userAuth, setUserAuth] = useState({});
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({ isReady: false });
  const [blog, setBlog] = useState(blogStructure);

  useEffect(() => {
    const userInSession = getFromSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <AppContext.Provider
      value={{
        userAuth,
        setUserAuth,
        blog,
        setBlog,
        editorState,
        setEditorState,
        textEditor,
        setTextEditor,
      }}
    >
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/" element={<Navbar />}>
          <Route path="/signin" element={<UserAuthForm type="sign in" />} />
          <Route path="/signup" element={<UserAuthForm type="sign up" />} />
        </Route>
      </Routes>
      <Toaster />
    </AppContext.Provider>
  );
};

export default App;
