import { Button, Container } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Userpage from "./Pages/Userpage"
import Postpage from "./Pages/Postpage"
import Header from "./Components/Header"
import HomePage from "./Pages/HomePage"
import AuthPage from "./Pages/AuthPage"
 
function App() {

  return (
    <Container maxW="620px">
      <Header/>
      <Routes>
        <Route path ='/' element={<HomePage/>}/>
        <Route path ='/auth' element={<AuthPage/>}/>

        <Route path ='/:username' element={<Userpage/>}/>
        <Route path ='/:username/post/:pId' element={<Postpage/>}/>
      </Routes>
    </Container>
  )
}

export default App
