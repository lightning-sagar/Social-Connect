import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";

 

function getuserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {username} = useParams();
  const showToast = useShowToast();
  useEffect(() => {
    const getUser = async () => {
        try {
          const res = await fetch(`/api/users/profile/${username}`);
          const data = await res.json();
          if (data.error) {
            showToast("Error", data.error, "error");
          }
          console.log(data.isFrozen);
          if(data.isFrozen){
            setUser(null);
            return 
          }
          else {
            setUser(data);
          }
        } catch (error) {
          showToast("Error", error.message, "error");
        } finally {
          setLoading(false);
        }
      };
      getUser();
  }, [username, showToast]);

  return { user, loading };
}

export default getuserProfile