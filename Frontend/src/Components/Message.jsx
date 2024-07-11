import { Avatar, Box, Flex, Text,Image, Skeleton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { selectconservationAtom } from '../Atom/ConservationAtom';
import { useRecoilValue } from 'recoil';
import userAtom from '../Atom/UserAtom';
import { BsCheck2All } from 'react-icons/bs';

const Message = ({ ownMessage, message }) => {
    const selectedConservation = useRecoilValue(selectconservationAtom);
    const currentuser = useRecoilValue(userAtom);
    const [imgLoaded, setImgLoaded] = useState(false);    

    return (
        <>
            {ownMessage ? (
                <Flex gap={2} alignSelf={"flex-end"}>
                    {message.text && (
                        <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
                            <Text color={"white"}>{message.text}</Text>
                            <Box alignSelf={"flex-end"} ml={1} color={message.seen?"blue.400":""} fontWeight={"bold"}>
                                <BsCheck2All size={16} />
                            </Box> 
                        </Flex>
                    )}
                    {message.image && !imgLoaded && (
                        <Flex mt={5} w={"200px"}>
                            <Image src={message.image} hidden onLoad={() => setImgLoaded(true)}  alt="mess img" borderRadius={4}/>   
                            <Skeleton w={"200px"} h={"200px"} borderRadius={4}/> 
                        </Flex>
                    )}
                    {message.image && imgLoaded && (
                        <Flex mt={5} w={"200px"}>
                            <Image src={message.image}  alt="mess img" borderRadius={4}/>   
                            <Box alignSelf={"flex-end"} ml={1} color={message.seen?"blue.400":""} fontWeight={"bold"}>
                                <BsCheck2All size={16} />
                            </Box> 
                        </Flex>
                    )}
                    <Avatar src={currentuser.profilePic} w={7} h={7} />

                </Flex>
            ) : (
                <Flex gap={2}>
                    <Avatar src={selectedConservation.userprofilePic} w={7} h={7} />
                    {message.text && (
                        <Text maxW={"350px"} p={1} borderRadius={"md"} bg={"gray.400"} color={"black"}>
                         {message.text}
                        </Text>
                    )}
                    {message.image && !imgLoaded && (
                        <Flex mt={5} w={"200px"}>
                            <Image src={message.image||""} hidden onLoad={() => setImgLoaded(true)}  alt="mess img" borderRadius={4}/>   
                            <Skeleton w={"200px"} h={"200px"} borderRadius={4}/> 
                        </Flex>
                    )}
                    {message.image && imgLoaded && (
                        <Flex mt={5} w={"200px"}>
                            <Image src={message.image||""}  alt="mess img" borderRadius={4}/>   
                        </Flex>
                    )}
                </Flex>
            )}
        </>
    );
};

export default Message;
