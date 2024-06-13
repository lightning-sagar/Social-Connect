import { Avatar, Box, Button, Divider, Flex, Image, Text } from '@chakra-ui/react'
import UserHeader from '../Components/UserHeader'
import UserPost from '../Components/UserPost'
import { BsThreeDots } from 'react-icons/bs'
import Action from '../Components/Action'
import { useState } from 'react'
import Comment from '../Components/Comment'
function UserPage() {
  const [liked,setLiked] = useState(false)

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src='/zuck-avatar.png' name="Mark Zuckerberg" size="md" />
          <Flex >
            <Text fontSize={"sm"} fontWeight={"bold"}>Mark Zuckerberg</Text>
            <Image src='/verified.png' w={4} h={4} ml={1} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>Let's talk about threads</Text>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid gray.light"}>
        <Image src={"/post1.png"} w="full"/>
      </Box>
      <Flex my={3} gap={3}>
        <Action liked={liked} setLiked={setLiked}/>
      </Flex>

      <Flex gap={2} alignItems={"center"} my={3}>
        <Text fontStyle={"sm"} color={"gray.light"}> 500 Replies</Text>
        <Box w={1} h={1} borderRadius={"full"} bg={"gray.light"} />
        <Text fontStyle={"sm"} color={"gray.light"}> {1234 + (liked ? 1 : 0)} Likes</Text>
      </Flex>
      <Divider my={4}/>
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋 </Text>
          <Text color={"gray.light"}>Grt the app to like, and reply </Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4}/>
      <Comment
        comment={"this is a comment"}
        likes={2134}
        created_at={"5d"}
        username={"max"}
        userAvatar="https://bit.ly/dan-abramov"
      />
      <Comment
        comment={"this is amazing"}
        likes={124}
        created_at={"2d"}
        username={"Alex"}
        userAvatar="https://bit.ly/kent-c-dodds"
      />
      <Comment
      comment={"Nice Post"}
      likes={514}
      created_at={"8d"}
      username={"Sam"}
      userAvatar="https://bit.ly/tioluwani-kolawole"
    />
    </>
  )
}

export default UserPage