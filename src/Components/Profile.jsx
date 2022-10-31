import React from "react";
import { useUserAuth } from "../Context/UserAuthContext";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
    AlertIcon,
    Alert,
    Avatar,
    Stack,
} from '@chakra-ui/react'
import { Image } from "react-bootstrap";

const Profile = () => {

    const { user, logOut } = useUserAuth();
    console.log(user);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (err) {
            console.log(err.massage);
        }
    }

    return (
        <>
            <div className="p-4 box mt-3 text-center">
                Hello Welcome <br />
                {
                    user.photoURL ?
                    <> 
                        <Image src={user.photoURL} />
                    </>
                    : <><Avatar src='https://bit.ly/broken-link' /><br /></>
                }
                {user.displayName && <> Name : { user.displayName }<br /></>} 
                {user && user.email}
            </div>
            <div className="d-grid gap-2">
                <Button colorScheme='red' onClick={onOpen}>
                    LogOut
                </Button>
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                LouOut
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <Alert status='warning'>
                                    <AlertIcon />
                                    Are you sure LouOut From Your Account ?
                                </Alert>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel Log Out
                                </Button>
                                <Button colorScheme='red' ref={cancelRef} onClick={handleLogOut} ml={3}>
                                    Sure Log Out
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </div>
        </>
    )
}

export default Profile
