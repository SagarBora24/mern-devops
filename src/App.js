import "./Components/Auth/Login"
import Login from "./Components/Auth/Login";
import Registration from "./Components/Auth/Registration";
import Home from "./Components/Sections/Home";
import { BrowserRouter,Routes, Route } from "react-router";



function App() {
  return (
   <>
    <BrowserRouter>
   <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  </BrowserRouter>
   
   </>
  );
}

export default App;
