import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";


const App = () => {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </main>
  );
}

export default App;
