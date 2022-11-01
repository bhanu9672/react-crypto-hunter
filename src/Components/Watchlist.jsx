import React from 'react'
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
} from '@chakra-ui/react'
import { useUserAuth } from '../Context/UserAuthContext'

const Watchlist = () => {

    const { watchlist,  } = useUserAuth();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    console.table( watchlist )

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
                        <Input placeholder='Type here...' />

                        { 
                        watchlist 
                        }
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
