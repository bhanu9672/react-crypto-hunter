import React, { useState } from 'react';
import CoinItems from './CoinItems';
import Coin from '../routes/Coin';
import Carousel from './Carousel';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Stack,
    Skeleton,
    Heading,
    Center,
} from '@chakra-ui/react'
import Form from 'react-bootstrap/Form';

const Coins = (props) => {

    const [search, Setsearch] = useState('');
    console.warn(search);

    return (
        <>
            <Carousel />
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Search Crypto Coin</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Search Crypto Coin"
                        onChange={(e) => Setsearch(e.target.value)}
                    />
                </Form.Group>
            </Form>
            {search}
            {
                props.coins == 0 ?
                    <>
                        <Stack my="100px" mx="30px">
                            <Skeleton height='40px' />
                            <Skeleton height='40px' />
                            <Skeleton height='40px' />
                            <Skeleton height='40px' />
                            <Skeleton height='40px' />
                            <Skeleton height='40px' />
                        </Stack>
                    </>
                    :
                    <>
                        <Center>
                            <Heading size='lg' fontSize='30px'>
                                Cryptocurrency Prices by Market Cap
                            </Heading>
                        </Center>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>#</Th>
                                        <Th>Coin Name</Th>
                                        <Th>Price</Th>
                                        <Th>Change (24h)</Th>
                                        <Th>Volume</Th>
                                        <Th>Mkt Cap</Th>
                                        <Th>Details Info</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        props.coins.filter(
                                            coins => {
                                                return (
                                                    coins.name.toLowerCase().includes(search) ||
                                                    coins.name.includes(search) ||
                                                    coins.symbol.toLowerCase().includes(search) 
                                                );
                                            })
                                            .map(coins => {
                                                return (
                                                    <>
                                                        {/* <Link to={`/coin/${coins.id}`} element={<Coin />} key={coins.id} > */}
                                                        <CoinItems coins={coins} key={coins.id} />
                                                        {/* </Link> */}
                                                    </>
                                                )
                                            })
                                    }
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th>#</Th>
                                        <Th>Coins</Th>
                                        <Th>Price</Th>
                                        <Th>24h</Th>
                                        <Th>Volume</Th>
                                        <Th>Mkt Cap</Th>
                                        <Th>Details Info</Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </>
            }
        </>
    )
}

export default Coins