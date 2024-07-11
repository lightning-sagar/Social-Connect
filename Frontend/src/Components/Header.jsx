import { Button, Flex, Image, useColorMode } from "@chakra-ui/react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import userAtom from "../Atom/UserAtom"
import { Link } from "react-router-dom"
import { AiFillHome } from "react-icons/ai"
import { RxAvatar } from "react-icons/rx"
import { Link as RouterLink } from "react-router-dom"
import { FiLogOut } from "react-icons/fi"
import useLogut from "../hooks/useLogut"
import authScreenAtom from "../Atom/AuthAtom"
import { BsFillChatQuoteFill } from "react-icons/bs"
import {MdOutlineSettings} from "react-icons/md"

function Header() {
    const logout = useLogut()
    const SetAuthScreen = useSetRecoilState(authScreenAtom)
    const {colorMode, toggleColorMode} = useColorMode()
    const user = useRecoilValue(userAtom)
  return (
    <Flex justifyContent={"space-between"} mt={6} mb="12">
      {user && (
        <Link as={RouterLink} to={'/'}>
        <AiFillHome size={24}/> 
        </Link>
      )}
      {!user && (
        <Link as={RouterLink} to={'/auth'}  onClick={() => SetAuthScreen('login')}>
          Login 
        </Link>
      )}
        <Image 
        cursor={"pointer"} alt="logo"
        w={6}
        src={colorMode === "dark"?"/light-logo.svg":"/dark-logo.svg"}
        onClick={toggleColorMode}
        />
      {user && (
        <Flex alignItems={"center"} gap={4} >
            <Link as={RouterLink} to={`/${user.username}`}>
              <RxAvatar size={24}/> 
            </Link>
            <Link as={RouterLink} to={`/chat`}>
              <BsFillChatQuoteFill size={20}/> 
            </Link>
            <Link as={RouterLink} to={`/settings`}>
              <MdOutlineSettings size={20}/> 
            </Link>
              <Button size={'xs'} onClick={logout}>
              <FiLogOut />
            </Button>
        </Flex>
      )}
      {!user && (
        <Link as={RouterLink} to={'/auth'} onClick={() => SetAuthScreen('Sign-up')}>
          Sign in 
        </Link>
      )}
    </Flex>
  )
}

export default Header