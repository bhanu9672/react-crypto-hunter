import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    Button,
    HStack,
    Box,
    ButtonGroup,
} from '@chakra-ui/react'
import { AiFillDelete } from "react-icons/ai";
import { Center, Square, Circle } from '@chakra-ui/react'
import { useUserAuth } from '../Context/UserAuthContext'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"

const Watchlist = () => {

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


    const { user, watchlist } = useUserAuth();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const removeFromWatchlist = async (coin) => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(coinRef, {
                coins: watchlist.filter((watch) => watch !== coin.id)
            },
                { merge: "true" }
            );
            console.log(coin.name + " Removed from the Watchlist !");
        } catch (error) {

        }
    }

    console.table(watchlist)

    console.log("coin :" + coin)

    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                Watchlist
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Your Coin Watchlist</DrawerHeader>



                    <DrawerBody>

                        <div className="py-5">
                            {
                                coin.map(coin => {
                                    if( watchlist.includes( coin.id ) )
                                    return (
                                        <>
                                            <HStack mb="30px">
                                                <Center>
                                                    Coin Id : {coin.name}
                                                </Center>
                                                <Center w='100px' h='40px'>
                                                    <Button colorScheme='teal' variant='solid' onClick={(e) => removeFromWatchlist(coin)}>
                                                        Remove
                                                    </Button>
                                                </Center>
                                            </HStack>
                                        </>
                                    )
                                })
                            }
                        </div>


                        {/* <div className="py-5">
                            {
                                coin.map(coin => {
                                    return (
                                        <>
                                            <HStack mb="30px">
                                                <Center>
                                                    Coin Id : {coin.name}
                                                </Center>
                                                <Center w='40px' h='40px' bg='tomato' color='white'>
                                                    <Button onClick={(e) => removeFromWatchlist(coin)}>
                                                        <AiFillDelete />
                                                    </Button>
                                                </Center>
                                            </HStack>
                                        </>
                                    )
                                })
                            }
                        </div> */}
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Watchlist
