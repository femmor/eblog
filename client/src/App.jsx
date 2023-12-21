import { Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default App;
