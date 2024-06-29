import { Button, Toast } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../Atom/UserAtom";
import  useShowToast  from "../hooks/useShowToast";
import { FiLogOut } from "react-icons/fi";
function LogoutBtn() {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();
  
    const handleLogout = async () => {
        try {
          const res = await fetch('/api/users/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });
      
          if (!res.ok) {
            const errorData = await res.json();
            showToast('Error', errorData.error || 'Failed to logout', 'error');
            console.log('Logout failed:', errorData);
            return;
          }
      
          const data = await res.json();
          console.log('Logout response:', data);
      
          localStorage.removeItem('user-threads');
          console.log('user-threads removed from localStorage');
      
          setUser(null);
          console.log('User state set to null');
      
          window.location.reload();
          console.log('Page reloaded');
        } catch (error) {
          showToast('Error', 'An error occurred while logging out', 'error');
          console.log('Logout error:', error);
        }
      };
      
  
    return (
      <Button position={'fixed'} top={'30px'} right={'30px'} size={'sm'} onClick={handleLogout}>
        <FiLogOut />
      </Button>
    );
  }

export default LogoutBtn