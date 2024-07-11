import { DeleteIcon } from "@chakra-ui/icons"
import { Avatar, Divider, Flex } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import userAtom from "../Atom/UserAtom"
import { useRecoilValue } from "recoil"
import useShowToast from "../hooks/useShowToast"

function Comment({  reply,lastReply }) {
  const currentUser = useRecoilValue(userAtom)
  return ( 
    <>
        <Flex gap={4} py={2} my={2} w={"full"}>
            <Avatar src={reply.userPic || reply.reply.userPic} name={reply.name} size="sm" />
            <Flex gap={1} w={"full"} flexDirection={"column"}>
                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{reply.username || reply.reply.username}</Text>
                </Flex>
                <Text>{reply.text || reply.reply.text}</Text>
                 
            </Flex>
        </Flex>
        {!lastReply ? <Divider /> : null}
    </>
  )
}

export default Comment