import React, { useEffect, useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Center,
    useToast,
    AlertIcon,
    Alert,
} from '@chakra-ui/react';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Context/UserAuthContext';

const Login = () => {

    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googlesignIn, user } = useUserAuth();
    const navigate = useNavigate();

    const toast = useToast()
    const toastIdRef = React.useRef()

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
                await logIn(email, password);
                toastIdRef.current = toast({
                    title: 'Account login successfully',
                    description: `Now you LogIn account with your Account.`,
                    status: 'success',
                    duration: 6000,
                    isClosable: true,
                    position: 'top',
                })
                navigate("/profile");
            } catch (err) {
                setError(err.message);
            }
        }

    };
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googlesignIn();
            toastIdRef.current = toast({
                title: 'Account login successfully',
                description: `Now you LogIn account with your Account.`,
                status: 'success',
                duration: 6000,
                isClosable: true,
                position: 'top',
            })
            console.log(user)
            navigate("/profile");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Log in to your account</Heading>
                    </Stack>
                    {
                        error && <Alert status='error'>
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
                                    Log in
                                </Button>
                                <Center>OR</Center>
                                <GoogleButton
                                    className="g-btn"
                                    type="dark"
                                    style={{ "width": "100%" }}
                                    onClick={handleGoogleSignIn}
                                />
                                <Center>
                                    <div className='text-center'>
                                        Don't have an account? <Link to="/signup">Sign In</Link>
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

export default Login