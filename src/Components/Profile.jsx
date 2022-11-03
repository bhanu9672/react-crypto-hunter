import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
    useToast,
    Image,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Center,
    HStack,
} from '@chakra-ui/react'
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { Col, Row } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"
import { Link } from "react-router-dom"

const Profile = () => {

    const [coin, setCoins] = useState([])
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'

    useEffect(() => {
        axios.get(url).then((response) => {
            setCoins(response.data)
            // console.log(response.data[0])
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const { user, logOut, watchlist } = useUserAuth();
    const toast = useToast();
    const toastIdRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const btnRef = React.useRef()
    const handleLogOut = async () => {
        try {
            await logOut();
            toastIdRef.current = toast({
                ///title: 'LogOut Successfully',
                description: `LogOut Successfully.`,
                status: 'success',
                duration: 6000,
                isClosable: true,
                position: 'top',
            })
        } catch (err) {
            console.log(err.massage);
        }
    }

    const removeFromWatchlist = async (coin) => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(coinRef, {
                coins: watchlist.filter((watch) => watch !== coin.id)
            },
                { merge: "true" }
            );
            console.log(coin.name + " Removed from the Watchlist !");
            toastIdRef.current = toast({
                //title: 'Account created.',
                description: `${coin.name}  Removed from the Watchlist !`,
                status: 'success',
                duration: 4000,
                position: 'top',
                isClosable: true,
            })
        } catch (error) {
        }
    }
    console.table(watchlist)

    return (
        <>
            <Row className="justify-content-md-center text-center my-5">
                <Col lg="6">
                    <Card>
                        <Card.Header as="h1"> <Text fontSize='3xl'>User Info</Text></Card.Header>
                        <Card.Body>
                            <Card.Title> Mail  : {user.email} </Card.Title>
                            {
                                user.photoURL ?
                                    <>
                                        <div className='i-block my-3'>
                                            <Image className='rounded' my="10px" src={user.photoURL} />
                                        </div>
                                    </>
                                    : <><Avatar my="10px" src='https://bit.ly/broken-link' /><br /></>
                            }
                            <div className='mb-4'>
                            <Button colorScheme='red' onClick={onOpen} my="15px">
                                LogOut
                            </Button>
                            </div>
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
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


            <Row className="justify-content-md-center text-center my-5">
                <Col lg="6">
                    <Card>
                        <Card.Header as="h1"> <Text fontSize='3xl'>Your Coin Watchlist</Text></Card.Header>
                        <Card.Body>

                            <ListGroup as="ol" numbered>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Subheading</div>
                                        Cras justo odio
                                    </div>
                                    <Badge bg="primary" pill>
                                        14
                                    </Badge>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Subheading</div>
                                        Cras justo odio
                                    </div>
                                    <Badge bg="primary" pill>
                                        14
                                    </Badge>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Subheading</div>
                                        Cras justo odio
                                    </div>
                                    <Badge bg="primary" pill>
                                        14
                                    </Badge>
                                </ListGroup.Item>
                            </ListGroup>

                            <ListGroup as="ol" numbered>
                                {
                                    coin.map(coin => {
                                        if (watchlist.includes(coin.id)) {
                                            return (
                                                <>
                                                    <ListGroup.Item
                                                        key={coin.id}
                                                        as="li"
                                                        className="d-flex justify-content-between align-items-start"
                                                    >
                                                        <div className="ms-2 me-auto">
                                                            <div className="fw-bold">
                                                                <Image
                                                                    style={{ display: "inline" }}
                                                                    borderRadius='full'
                                                                    boxSize='40px'
                                                                    src={coin.image}
                                                                    mr="5px"
                                                                />
                                                                {coin.name}
                                                            </div>
                                                            ${coin.current_price.toLocaleString()}
                                                        </div>
                                                        <Button colorScheme='red' variant='solid' onClick={(e) => removeFromWatchlist(coin)}>
                                                            Remove
                                                        </Button>
                                                        <Link to={`/coin/${coin.id}`}>
                                                            <Button colorScheme='teal' variant='solid'>
                                                                Coin Ingo Page
                                                            </Button>
                                                        </Link>
                                                    </ListGroup.Item>
                                                </>
                                            )
                                        }
                                    })
                                }
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Profile
