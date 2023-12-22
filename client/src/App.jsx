import { Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import { UserAuthForm } from "./pages";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/signin" element={<UserAuthForm type="sign in" />} />
          <Route path="/signup" element={<UserAuthForm type="sign up" />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
