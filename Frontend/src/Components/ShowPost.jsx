import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Action from "./Action";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";

function ShowPost({ post, posted_by }) {
  const showToast = useShowToast();
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
      const getuser = async() => {
        try {
            const res = await fetch(`/api/users/profile/`+ posted_by);
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            setUser(data);
        } catch (error) {
            showToast("Error", error, "error");
        }
      }
      getuser();
  },[posted_by, showToast])  

  if (!post) {
    return <Text>No post available</Text>; 
  }
  if(!user ) return;
  return (
    <Link to={`/${user.username}/post/${post.id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name={user?.username} src={user?.profilePic} bg={"gray.light"} onClick={(e)=>{
            e.preventDefault()
            navigate(`/${user.username}`)
          }} />
          <Box w="1px" h={"full"} bg="gray.light" my={2} />
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && (
                <Text textAlign={"center"}>🥱</Text>
            )}
            {post.replies[0] && (
            <Avatar size="xs" name={post.replies[0].username} src={post.replies[0].userPic} position={"absolute"} top="0" left={"15px"} padding={"2px"} />
            )}
            {post.replies[1] && (
            <Avatar size="xs" name={post.replies[1].username} src={post.replies[1].userPic} position={"absolute"} top="0" left={"15px"} padding={"2px"} />
            )}
            {post.replies[2] && (
            <Avatar size="xs" name={post.replies[2].username} src={post.replies[2].userPic} position={"absolute"} top="0" left={"15px"} padding={"2px"} />
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"center"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"} onClick={(e)=>{
            e.preventDefault()
            navigate(`/${user.username}`)
          }}>{user?.username}</Text>
              <Image src='/verified.png' w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray.light"}>1d</Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid gray.light"}>
              <Image src={post.img} w="full" />
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Action liked={liked} setLiked={setLiked} /> {/* Fix the setLiked prop */}
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>{post.replies} Replies</Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"} />
            <Text color={"gray.light"} fontSize={"sm"}>{post.likes} Like</Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}

export default ShowPost;
