import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Action from "./Action";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import {formatDistanceToNow} from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import userAtom from "../Atom/UserAtom";
import { useRecoilValue } from "recoil";

function ShowPost({ post, posted_by }) {
  const showToast = useShowToast();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const currentuser = useRecoilValue(userAtom);
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
  
  const handleDeletePost = async(e) =>{
    try {
      e.preventDefault()
      if(!window.confirm("Are you sure you want to delete this post?")) return;
      const res = await fetch(`/api/post/${post._id}`, {
        method: "DELETE",
      })

      const data = await res.json();
      if(data.error){
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", data.message, "success");

    } catch (error) {
      showToast("Error", error, "error");
    }
  }

  if (!post) {
    return <Text>No post available</Text>; 
  }
  if(!user ) return;
  return (
    <Link to={`/${user.username}/post/${post._id}`}>
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
							<Avatar
								size='xs'
								name='John doe'
								src={post.replies[0].userPic}
								position={"absolute"}
								top={"0px"}
								left='15px'
								padding={"2px"}
							/>
						)}

						{post.replies[1] && (
							<Avatar
								size='xs'
								name='John doe'
								src={post.replies[1].userPic}
								position={"absolute"}
								bottom={"0px"}
								right='-5px'
								padding={"2px"}
							/>
						)}

						{post.replies[2] && (
							<Avatar
								size='xs'
								name='John doe'
								src={post.replies[2].userPic}
								position={"absolute"}
								bottom={"0px"}
								left='4px'
								padding={"2px"}
							/>
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
              <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>
              {currentuser?._id === user._id && (
              <DeleteIcon cursor={"pointer"} size={20} onClick={handleDeletePost} />
              )}
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid gray.light"}>
              <Image src={post.img} w="full" />
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Action post={post} /> {/* Fix the setLiked prop */}
          </Flex>
          
        </Flex>
      </Flex>
    </Link>
  );
}

export default ShowPost;
