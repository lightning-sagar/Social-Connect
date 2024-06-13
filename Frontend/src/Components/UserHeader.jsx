import { Box, VStack,Flex,Text,Link } from "@chakra-ui/layout";
import { Avatar, Menu, MenuButton, MenuItem, MenuList, Portal, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO, CgMoreR } from "react-icons/cg";
function UserHeader() {
  const toast = useToast()
  const copyURL = ()=>{
    const url = window.location.href
    navigator.clipboard.writeText(url).then(()=>{
      toast({
        title: 'Copied to clipboard',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    })
  }
  return (
    <VStack gap={4} alignItems={"start"}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Box>
            <Text fontSize={"2xl"} fontWeight={"bold"} >Mark Zuckerberg</Text>  
            <Flex gap={2} alignItems={"center"}> 
              <Text fontSize={"sm"} >Mark</Text>
              <Text fontSize={"sm"} bg={"gray.dark"} color={"gray.light"} p="1" borderRadius={"full"}>thread.xt</Text>
            </Flex>
          </Box> 
          <Box>
            
            <Avatar
            name="Mark Zuckerberg"
            src="/zuck-avatar.png"
            />
          </Box> 
        </Flex>
        <Text>Co-founder of Facebook,exicutive of Pinterest</Text>
        <Flex
        w={"full"}
        alignItems={"center"}
        >
          <Flex alignItems={"center"} gap={2}>
            <Text color={"gray.light"}>3.2k followers</Text>
            <Box h={1} w={1} bg="gray.light" borderRadius={"full"} ></Box>
            <Link color={"gray.light"}>Instagram.com</Link>
          </Flex>
          <Flex>
            <Box className="icon-container">
              <BsInstagram size={24} cursor={"pointer"} />
            </Box>
            <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
                </MenuList>
              </Portal>
              </Menu>
            </Box>
          </Flex>
        </Flex>
        <Flex
        w={"full"}>
          <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"} >
            <Text fontWeight={"bold"}>Threads</Text>
          </Flex>
          <Flex flex={1} borderBottom={"1px solid gray"} color={"gray.light"} justifyContent={"center"} pb="3" cursor={"pointer"} >
            <Text fontWeight={"bold"}>Reply</Text>
          </Flex>
        </Flex>
    </VStack>
  )
}

export default UserHeader