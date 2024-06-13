import { Avatar, Divider, Flex } from "@chakra-ui/react"
import { useState } from "react"
import { Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Action from "./Action"

function Comment({ username, created_at,userAvatar,comment,likes }) {
    const [liked, setLiked] = useState(false)
  return ( 
    <>
        <Flex gap={4} py={2} my={2} w={"full"}>
            <Avatar src={userAvatar} name="Mark Zuckerberg" size="sm" />
            <Flex gap={1} w={"full"} flexDirection={"column"}>
                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{username}</Text>
                    <Flex gap={2} alignItems={"center"} >
                        <Text fontSize={"sm"} color={"gray.light"}>{created_at}</Text>
                        <BsThreeDots/>
                    </Flex>
                </Flex>
                <Text>{comment}</Text>
                <Action liked={liked} setLiked={setLiked}/>
                <Text fontSize={"sm"} color={"gray.light"}>
                    {likes + (liked ? 1 : 0)} Likes
                </Text>
            </Flex>
        </Flex>
        <Divider />
    </>
  )
}

export default Comment