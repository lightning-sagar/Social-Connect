import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Userpage from "./Pages/Userpage";
import Postpage from "./Pages/Postpage";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./Atom/UserAtom";
import UpdatePage from "./Pages/UpdatePage";
import CreatePost from "./Components/CreatePost";
import Chatpage from "./Pages/Chatpage";
import SettingsPage from "./Pages/SettingsPage";

function App() {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();

  return (
    <Box position={"relative"} w={"full"}>
      <Container maxW={pathname === "/" ? "900px" : "620px"}>
        <Header />
        <Routes>
          <Route path="/" element={user ? (
            <>
              <HomePage />
              <CreatePost />
            </>
          ) : (
            <Navigate to="/auth" />
          )} />
          <Route path="/update" element={user ? <UpdatePage /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
          <Route path="/:username" element={user ? (
            <>
              <Userpage />
              <CreatePost />
            </>
          ) : (
            <Navigate to="/auth" />
          )} />
          <Route path="/:username/post/:pId" element={<Postpage />} />
          <Route path="/chat" element={user ? <Chatpage /> : <Navigate to="/auth" />} />
          <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/auth" />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
