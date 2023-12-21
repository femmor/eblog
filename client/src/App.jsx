import { Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp, UserAuthForm } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/signin" element={<UserAuthForm type="sign in" />} />
        <Route path="/signup" element={<UserAuthForm type="sign up" />} />
      </Route>
    </Routes>
  );
};

export default App;
