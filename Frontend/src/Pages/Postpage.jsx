import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import Action from '../Components/Action';
import { useEffect, useState } from 'react';
import Comment from '../Components/Comment';
import useShowToast from '../hooks/useShowToast';
import { useNavigate, useParams } from 'react-router-dom';
import getuserProfile from '../hooks/getuserProfile';
import { formatDistanceToNow } from 'date-fns';
import userAtom from '../Atom/UserAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DeleteIcon } from '@chakra-ui/icons';
import postsAtom from '../Atom/postsAtom';

function Postpage() {
  const navigate = useNavigate(); 
  const { user, loading } = getuserProfile();
  const [posts, setPosts] = useRecoilState(postsAtom);  
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const { pId } = useParams();
  const currentPost = posts.find(post => post._id === pId);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/post/${pId}`);
        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "Error");
          return;
        }
        setPosts([data]);
      } catch (error) {
        showToast("Error", error.message, "Error");
      }
    };

    getPost();
  }, [showToast, pId, setPosts]);

  const handleDeletePost = async (e) => {
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;
      const res = await fetch(`/api/post/${currentPost._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", data.message, "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  if (loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!currentPost) return null;

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilePic} name={user.name} size="md" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>{user.username}</Text>
            <Image src='/verified.png' w={4} h={4} ml={1} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>
          {currentUser?._id === user._id && (
            <DeleteIcon cursor={"pointer"} size={20} onClick={handleDeletePost} />
          )}
        </Flex>
      </Flex>
      <Text my={3}>{currentPost.text}</Text>
      {currentPost.img && (
        <Box borderRadius={6} overflow={"hidden"} border={"1px solid gray.light"}>
          <Image src={currentPost.img} w="full" />
        </Box>
      )}
      <Flex my={3} gap={3}>
        <Action post={currentPost} />
      </Flex>

      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋 </Text>
          <Text color={"gray.light"}>Get the app to like, and reply </Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      
      {currentPost?.replies?.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={currentPost.replies.length - 1 === currentPost.replies.indexOf(reply)}
          posted_by={reply.posted_by}
        />
      ))}
    </>
  );
}

export default Postpage;
