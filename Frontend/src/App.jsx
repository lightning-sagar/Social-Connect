import { Button, Container } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"
import Userpage from "./Pages/Userpage"
import Postpage from "./Pages/Postpage"
import Header from "./Components/Header"
import HomePage from "./Pages/HomePage"
import AuthPage from "./Pages/AuthPage"
import { useRecoilValue } from "recoil"
import userAtom from "./Atom/UserAtom"
import LogoutBtn from "./Components/LogoutBtn"
import UpdatePage from "./Pages/UpdatePage"
import CreatePost from "./Components/CreatePost"
 
function App() {
  const user = useRecoilValue( userAtom );
  return (
    <Container maxW="620px">
      <Header/>
      <Routes>
        <Route path ='/' element={user?<HomePage/> :<Navigate to='/auth' />}/>
        <Route path ='/update' element={user?<UpdatePage/> :<Navigate to='/auth' />}/>
        <Route path ='/auth' element={!user ? <AuthPage/>:<Navigate to='/' />}/>

        <Route path ='/:username' element={<Userpage/>}/>
        <Route path ='/:username/post/:pId' element={<Postpage/>}/>
      </Routes>
      {user && <LogoutBtn/>}
      {user && <CreatePost/>}
    </Container>
  )
}

export default App
