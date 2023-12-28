import { useContext, useState } from "react";
import { AppContext } from "../App";
import { Navigate } from "react-router-dom";
import { BlogEditor, PublishForm } from "../components";

const Editor = () => {
  const {
    userAuth: { access_token },
    editorState,
  } = useContext(AppContext);

  return access_token === null ? (
    <Navigate to="/signin" />
  ) : editorState === "editor" ? (
    <BlogEditor />
  ) : (
    <PublishForm />
  );
};
export default Editor;
