import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../Atom/UserAtom";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import ShowPost from "../Components/ShowPost";
import postsAtom from "../Atom/postsAtom";
import SuggestedUsers from "../Components/SuggestedUsers";

function HomePage() {
  const user = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res = await fetch("/api/post/feed");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setPosts(data);  
      } catch (error) {
        console.log(error);
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [user, showToast, setPosts]);

  return (
    <Flex gap={10} alignItems={"flex-start"}>
      <Box flex={70}>
        {!loading && posts.length === 0 && (
          <Flex justifyContent={"center"} alignItems={"center"} h={"full"}>
            <Text>Follow people to see their posts</Text>
          </Flex>
        )}
        {loading && (
          <Flex justifyContent={"center"} alignItems={"center"} h={"full"}>
            <Spinner size='xl' />
          </Flex>
        )}
        {posts && posts.map((post) => (
          <ShowPost key={post._id} post={post} posted_by={post.posted_by} />
        ))}
      </Box>
      <Box flex={30}>
        <SuggestedUsers/>
      </Box>
    </Flex>
  );
}

export default HomePage;
