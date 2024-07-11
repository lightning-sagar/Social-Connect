import { Avatar, AvatarBadge, Box, Flex, Image, Stack, Text, useColorMode, useColorModeValue, WrapItem } from "@chakra-ui/react"
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from "../Atom/UserAtom"
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import {selectconservationAtom} from "../Atom/ConservationAtom";

function Conservation({conservation,isOnline}) {
    const user = conservation.participants[0];
    const lastmess = conservation.lastMessage;
    const currentuser =useRecoilValue(userAtom);
    const [selectconservation, setselectconservation] = useRecoilState(selectconservationAtom);
    const colorMode =useColorMode();
    
  return (
    <Flex gap={4} alignItems={"center"} p={1}
     _hover={{
        cursor:"pointer", bg:useColorModeValue("gray.600","gray.dark"),
        color:"white"
    }}
    borderRadius={"md"}
    onClick={() => setselectconservation({
        _id: conservation._id,
        userId:user._id,
        username: user.username,
        userprofilePic: user.profilePic,
        mock:conservation.mock
    })} 
    bg={selectconservation?._id === conservation._id ? (colorMode === "light" ? "gray.600":"gray.dark"): ""}
    >
        <WrapItem> 
            <Avatar size={{
                base: "xs",
                sm: "sm",
                md: "md",
            }} name="Dan" src={user.profilePic} >
                {isOnline ? <AvatarBadge boxSize="1em" bg="green.500" /> :""}
            </Avatar>
        </WrapItem>
        <Stack direction={"column"} fontSize={"sm"}>
            <Text fontWeight={"700"} display={"flex"} alignItems={"center"} >
                {user.username} 
                <Image src='/verified.png' w={4} h={4} ml={1}/>
            </Text>
            <Text fontSize={"sm"} display={"flex"} alignItems={"center"} gap={1}>
                {currentuser._id === lastmess.sender._id ? (
                    <Box color={lastmess.seen?"blue.400":""}>
                        <BsCheck2All size={16}/> 
                    </Box>
                ): ""}
                {lastmess.text.length>18 ? lastmess.text.slice(0,18) + "..." : lastmess.text }
                
            </Text>
        </Stack>
    </Flex>
  )
}

export default Conservation 