import {Avatar, Box, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import {Image,Text} from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Action from "./Action"
import { useState } from "react"
function UserPost  ({postImg,postTitle,like,replies}) {
  const [liked,setLiked] = useState(false)
  return (
    <Link to={"/mark/post/1"}>
        <Flex gap={3} mb={4} py={5} >
            <Flex flexDirection={"column"} alignItems={"center"}>
                <Avatar size="md" name="Mark" src="/zuck-avatar.png" />
                <Box w="1px" h={"full"} bg="gray.light" my={2}/>
                <Box position={"relative"} w={"full"} >
                    <Avatar size="xs" name="max" src="https://bit.ly/dan-abramov" position={"absolute"} top="0" left={"15px"} padding={"2px"} />
                    <Avatar size="xs" name="Kola " src="https://bit.ly/tioluwani-kolawole" position={"absolute"} bottom="0" right={"-5px"} padding={"2px"} />
                    <Avatar size="xs" name="Dan" src="https://bit.ly/kent-c-dodds" position={"absolute"} bottom="0" left={"4px"} padding={"2px"} />
                </Box>
            </Flex>
            <Flex flex={1} flexDirection={"column"} gap={2}>
                <Flex justifyContent={"center"} w={"full"}>
                  <Flex w={"full"} alignItems={"center"}>
                    <Text fontsize={"sm"} fontWeight={"bold"}>Mark Zuckerberg</Text>
                    <Image src='/verified.png' w={4} h={4} ml={1}/>
                  </Flex>
                  <Flex gap={4} alignItems={"center"}>
                    <Text fontStyle={"sm"} color={"gray.light"}>1d</Text>
                    <BsThreeDots />
                  </Flex>
                </Flex>
                <Text fontSize={"sm"}>{postTitle}</Text>
                {postImg && (
                  <Box borderRadius={6} overflow={"hidden"} border={"1px solid gray.light"}>
                  <Image src={postImg} w="full"/>
                </Box>
                )}
                <Flex gap={3} my={1}>
                  <Action liked={liked} setLiked={setLiked}/>
                </Flex>
                <Flex gap={2} alignItems={"center"}>
                  <Text color={"gray.light"} fontSize={"sm"}>{replies} Replies</Text>
                  <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"} />
                  <Text color={"gray.light"} fontSize={"sm"}>{like} Like</Text>
                </Flex>
            </Flex>
        </Flex>
    </Link>
  )
}

export default UserPost