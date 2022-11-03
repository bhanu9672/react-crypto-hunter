import React, { useState } from 'react'
import {
    Form,
    Row,
    Col,
} from 'react-bootstrap';
import {
    useToast,
    Center,
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
    AlertIcon,
    Alert,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Context/UserAuthContext';

const Signup = () => {

    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [error, setError] = useState("");
    const { signUp } = useUserAuth();
    const navigate = useNavigate();

    const toast = useToast()
    const toastIdRef = React.useRef()
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (email == "" && password == "") {
            toastIdRef.current = toast({
                //title: '',
                description: `Please fill out all required fields.`,
                status: 'error',
                duration: 6000,
                isClosable: true,
                position: 'top',
            })
        } else {
            try {
                await signUp(email, password);
                toastIdRef.current = toast({
                    title: 'Account created.',
                    description: `We've created your account for you.`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top',
                })
                navigate("/login")
            } catch (err) {
                setError(err.message);
            }
        }

    };

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign Up to your account</Heading>
                    </Stack>
                    {
                        error &&
                        <Alert status='error'>
                            <AlertIcon />
                            {error}
                        </Alert>
                    }
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email Address</FormLabel>
                                <Input type="email" placeholder="Enter Email" onChange={(e) => SetEmail(e.target.value)} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" placeholder="Enter Password" onChange={(e) => SetPassword(e.target.value)} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Sign Up
                                </Button>
                                <Center>
                                    <div className='text-center'>
                                        Already have an account? <Link to="/login">Log In</Link>
                                    </div>
                                </Center>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>

        </>
    )
}

export default Signup