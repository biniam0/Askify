import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const auth = useAuth();
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />}></Route>
        )}
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </main>
  );
};

export default App;
