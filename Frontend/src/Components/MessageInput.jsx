import { Flex, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { IoSendSharp } from 'react-icons/io5'
import useShowToast from '../hooks/useShowToast'
import { Image } from '@chakra-ui/react'
import { ConservationAtom, selectconservationAtom } from '../Atom/ConservationAtom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { BsFillImageFill } from 'react-icons/bs'
import usePreviewImg from '../hooks/usePreviewImg'

function MessageInput({ setMessage }) {
  const [messageText, setMessageText] = useState("")  
  const showToast = useShowToast()
  const selectedConservation = useRecoilValue(selectconservationAtom)
  const [conservations, setConservations] = useRecoilState(ConservationAtom) 
  const imageRef = useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg()
  const [isSending, setIsSending] = useState(false)

  const handleSendMess = async (e) => {
    e.preventDefault()
    if (!messageText && !imgUrl) return
    if(isSending) return
    setIsSending(true)
    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          recipient: selectedConservation.userId,
          img: imgUrl,
        }),
      })
      const data = await res.json()
      if (data.error) {
        showToast('Error', data.error, 'error')
        return
      }

      setMessage((prevMessages) => [...prevMessages, data])

      setConservations((prevCons) => {
        return prevCons.map((conservation) => {
          if (conservation._id === selectedConservation._id) {
            return {
              ...conservation,
              lastMessage: {
                text: messageText,
                sender: selectedConservation.userId,
              },
            }
          }
          return conservation
        })
      })
      setImgUrl("")
      setMessageText("")  
    } catch (error) {
      showToast('Error', error.message || 'An error occurred', 'error')  
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Flex gap={2} alignItems={"center"}>
      <form onSubmit={handleSendMess}style={{ flex: 95 }}>
        <InputGroup>
          <Input
            width="full"
            placeholder="Type here..."
            onChange={(e) => setMessageText(e.target.value)}
            value={messageText}
          />
          <InputRightElement onClick={handleSendMess} cursor="pointer">
            <IoSendSharp />
          </InputRightElement>
        </InputGroup>
      </form>
      <Flex flex={5} cursor={"pointer"}>
				<BsFillImageFill size={20} onClick={() => imageRef.current.click()} />
				<Input type={"file"} hidden ref={imageRef} onChange={handleImageChange} />
			</Flex>
			<Modal
				isOpen={imgUrl}
				onClose={() => {
					onClose();
					setImgUrl("");
				}}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex mt={5} w={"full"}>
							<Image src={imgUrl} />
						</Flex>
						<Flex justifyContent={"flex-end"} my={2}>
							{!isSending ? (
								<IoSendSharp size={24} cursor={"pointer"} onClick={handleSendMess} />
							) : (
								<Spinner size={"md"} />
							)}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
  )
}

export default MessageInput
