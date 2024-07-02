import React, { useState } from 'react';
import { VStack, Flex, Text, Link, Box, Avatar, Menu, MenuButton, MenuItem, MenuList, Portal, useToast, Spinner, Button } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../Atom/UserAtom";
import { Link as RouterLink } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
const UserHeader = ({ user }) => {
  const currentuser = useRecoilValue(userAtom);
  const toast = useToast();
  const showToast = useShowToast();
  const [following, setFollowing] = useState(() => {
    if (currentuser) {
      return user.followers.includes(currentuser._id);
    }
    return false;
  });
  const [updating, setUpdating] = useState(false);

  const followHandler = async () => {
    if (!currentuser) {
      showToast("Error", "Please login to follow", "error");
      return;
    }
    if (updating) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      setFollowing(!following);

      if (following) {
        showToast("Success", `${user.name} unfollowed successfully`, "success");
        user.followers.pop();
      } else {
        showToast("Success", `${user.name} followed successfully`, "success");
        user.followers.push(currentuser._id);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setUpdating(false);
    }
  };

  const copyURL = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: 'Copied to clipboard',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    });
  };

  if (!user) {
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <VStack gap={4} alignItems="start">
      <Flex justifyContent="space-between" w="full">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">{user.name}</Text>
          <Flex gap={2} alignItems="center">
            <Text fontSize="sm">{user.username}</Text>
            <Text fontSize="xm" bg="gray.dark" color="gray.light" p="1" borderRadius="full">thread.xt</Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic ? (
            <Avatar
              name={user.name}
              src={user.profilePic}
              size={{
                base: "md",
                md: "xl",
              }}
            />
          ) : (
            <Avatar
              name={user.name}
              src="https://bit.ly/dan-abramov"
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
        </Box>
      </Flex>
      <Text>{user.bio}</Text>
      {currentuser?._id === user._id && (
        <Link as={RouterLink} to={'/update'}>
          <Button size="sm">Update Profile</Button>
        </Link>
      )}
      {currentuser?._id !== user._id && (
        <Button size="sm" onClick={followHandler} isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}
      <Flex w="full" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <Text color="gray.light">{user?.followers?.length} followers</Text>
          <Box h={1} w={1} bg="gray.light" borderRadius="full"></Box>
          <Link color="gray.light">Instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor="pointer" />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor="pointer" />
              </MenuButton>
              <Portal>
                <MenuList bg="gray.dark">
                  <MenuItem bg="gray.dark" onClick={copyURL}>Copy Link</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w="full">
        <Flex flex={1} borderBottom="1.5px solid white" justifyContent="center" pb="3" cursor="pointer">
          <Text fontWeight="bold">Threads</Text>
        </Flex>
        <Flex flex={1} borderBottom="1px solid gray" color="gray.light" justifyContent="center" pb="3" cursor="pointer">
          <Text fontWeight="bold">Reply</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};


export default UserHeader;
