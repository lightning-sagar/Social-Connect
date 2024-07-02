import { useEffect, useState } from "react";
import UserHeader from "../Components/UserHeader";
import ShowPost from "../Components/ShowPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import getuserProfile from "../hooks/getuserProfile";

function Userpage() {
  const { user, loading } = getuserProfile();
  const { username } = useParams();
  const showToast = useShowToast();
  const [posts, setPosts] = useState([]);
  const [fetchingPost, setFetchingPost] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setFetchingPost(true);
      try {
        console.log(username);
        const res = await fetch(`/api/post/user/${username}`);
        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
        } else {
          setPosts(data);
        }
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPost(false);
      }
    };

    getPosts();
  }, [username, showToast]);

  if (loading) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"} h={"full"}>
        <Spinner size='xl' />
      </Flex>
    );
  }

  if (!user) {
    return (
      <h1>User not found</h1>
    );
  }

  return (
    <>
      { <UserHeader user={user} />}
       { !fetchingPost && posts.length ===0 && <h1>No posts available</h1>}
       { fetchingPost && <Flex justifyContent={"center"} my={12}>
        <Spinner size='xl' />
      </Flex>}
      {posts.map((post) => (
        <ShowPost key={post._id} post={post} posted_by={post.posted_by} />
      ))}
    </>
  );
}

export default Userpage;