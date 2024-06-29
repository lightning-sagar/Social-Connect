import { useEffect, useState } from "react";
import UserHeader from "../Components/UserHeader";
import ShowPost from "../Components/ShowPost"; // Correct component import
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";

function Userpage() {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };
    getUser();
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
      {user && <UserHeader user={user} />}
      {user.posts && user.posts.map(post => (
        <ShowPost key={post.id} post={post} userId={user._id} />
      ))}
    </>
  );
}

export default Userpage;
