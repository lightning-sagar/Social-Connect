import { AddIcon } from '@chakra-ui/icons';
import { FormControl } from '@chakra-ui/form-control';
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import usePreviewImg from '../hooks/usePreviewImg';
import { BsFillImageFill } from 'react-icons/bs';
import useShowToast from '../hooks/useShowToast';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../Atom/UserAtom';
import postsAtom from '../Atom/postsAtom';
import { useParams } from 'react-router-dom';

function CreatePost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ImageRef = useRef(null);
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const maxWords = 550;
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [postText, setPostText] = useState('');
  const showToast = useShowToast();
  const [remainingChars, setRemainingChars] = useState(maxWords);
  const currentuser = useRecoilValue(userAtom);
  const [uploading, setUploading] = useState(false);
  const {username} = useParams();

  const handleTextChange = (e) => {
    const { value } = e.target;
    setPostText(value);
    const remaining = maxWords - value.length;
    setRemainingChars(Math.max(remaining, 0));
  };

  const handleSubmit = async () => {
    if (!postText ) {
      showToast('Error', 'Please enter some text', 'error');
      return;
    }
    if(uploading) return;

    setUploading(true);
    try {
      const response = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: postText,
          img: imgUrl,
          posted_by: currentuser._id,
        }),
      });

      const data = await response.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      } else {
        showToast('Success', 'Post created successfully', 'success');
        if(username === currentuser.username){
          setPosts([data, ...posts]);
        }
        setPostText('');
        setImgUrl(null);
        onClose();
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('Error', 'Failed to create post', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Button
        position="fixed"
        bottom="10"
        right="10"
        leftIcon={<AddIcon />}
        bg={useColorModeValue('gray.300', 'gray.dark')}
        onClick={onOpen}
      >
        Create Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="What is on your mind?"
                value={postText}
                onChange={handleTextChange}
              />
              <Text fontSize="xs" fontWeight="bold" textAlign="right" color="gray.800" m={2}>
                {remainingChars}/{maxWords}
              </Text>
              <Input type="file" hidden ref={ImageRef} onChange={handleImageChange} />
              <BsFillImageFill
                onClick={() => ImageRef.current.click()}
                size={16}
                style={{ marginLeft: '5px', cursor: 'pointer' }}
              />
            </FormControl>
            {imgUrl && (
              <Flex mt={5} position="relative" width="full">
                <Image src={imgUrl} alt="image" />
                <Button
                  onClick={() => setImgUrl(null)}
                  bg="gray.800"
                  position="absolute"
                  right={2}
                  top={2}
                  color="white"
                >
                  Remove
                </Button>
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={uploading}>
            Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatePost;
