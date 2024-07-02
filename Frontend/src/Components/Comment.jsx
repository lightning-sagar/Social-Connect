import { Avatar, Divider, Flex } from "@chakra-ui/react"
import { useState } from "react"
import { Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Action from "./Action"

function Comment({  reply }) {
  return ( 
    <>
        <Flex gap={4} py={2} my={2} w={"full"}>
            <Avatar src={reply.userPic} name="Mark Zuckerberg" size="sm" />
            <Flex gap={1} w={"full"} flexDirection={"column"}>
                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{reply.username}</Text>
                     
                </Flex>
                <Text>{reply.text}</Text>
                 
            </Flex>
        </Flex>
        <Divider />
    </>
  )
}

export default Comment