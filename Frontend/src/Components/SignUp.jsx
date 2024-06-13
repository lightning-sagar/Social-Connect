import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useSetRecoilState } from 'recoil';
  import authScreenAtom from '../Atom/AuthAtom';
    
  export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreenState = useSetRecoilState(authScreenAtom);
    const toast = useToast();
    const [Inputs,setInput] = useState({
      name: '',
      email: '',
      username:'',
     password: '',
    })
    const handlesignup = async () => {
      console.log(Inputs)
      try {
        const res = await fetch('/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({Inputs}),
        })
        const data = await res.json();
        console.log(data)
        
        if(data.error){
          console.log(data.error)
          toast({
            title: "Error",
            description: data.error,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          return;
        }
        localStorage.setItem('user-threads',JSON.stringify(data))
      } catch (error) {
        console.error(error)
      }
    }
    return (
      <Flex
        align={'center'}
        justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.dark')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl  isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input type="text" onChange={(e) => setInput({ ...Inputs, name: e.target.value })} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" onChange={(e) => setInput({ ...Inputs, username: e.target.value })}/>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e) => setInput({ ...Inputs, email: e.target.value })}/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setInput({ ...Inputs, password: e.target.value })}
                   />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={useColorModeValue("gray.600", "gray.700")}
                  color={'white'}
                  _hover={{
                    bg: useColorModeValue("gray.700", "gray.800")
                  }} 
                  onClick={handlesignup}
                  >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} onClick={()=>setAuthScreenState("login")} >Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }