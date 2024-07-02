import { Avatar, Box, Button, Divider, Flex, Image, Text, useFocusEffect } from '@chakra-ui/react'
import UserHeader from '../Components/UserHeader'
import UserPost from '../Components/UserPost'
import { BsThreeDots } from 'react-icons/bs'
import Action from '../Components/Action'
import { useEffect, useState } from 'react'
import Comment from '../Components/Comment'
import useShowToast from '../hooks/useShowToast'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userAtom from '../Atom/UserAtom'
function UserPage() {
  const [user, setUser] = useState(null)
  const [post, setPost] = useState(null)
  const showToast = useShowToast();
  const {pid } = useParams();
  const currentuser = useRecoilValue(userAtom);
  const navigate = useNavigate();
  useEffect(()=>{
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
        } else {
          setPost(data);
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    }
    const handleDeletePost = async (e) => {
      try {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        const res = await fetch(`/api/post/${post._id}`, {
          method: "DELETE",

        });
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
        } else {
          showToast("Success", data.message, "success");
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    }
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
        } else {
          setUser(data);
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  },[])

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
        <Action post={post}/>
      </Flex>

      <Flex gap={2} alignItems={"center"} my={3}>
        <Text fontStyle={"sm"} color={"gray.light"}> 500 Replies</Text>
        <Box w={1} h={1} borderRadius={"full"} bg={"gray.light"} />
        <Text fontStyle={"sm"} color={"gray.light"}> {1234} Likes</Text>
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
      {post?.replies.map(reply => (
         <Comment
        key={reply._id}
        comment={reply}
        posted_by={reply.posted_by}
      /> 
      ))}
      
    </>
  )
}

export default UserPage