import React, { useState } from 'react';
import Coin from '../routes/Coin';
import Carousel from './Carousel';
import {
    Stack,
    Skeleton,
    Center,
    Image,
    Badge,
} from '@chakra-ui/react'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import { Table } from "react-chakra-pagination";
// Use Chakra Ui for create a custom component for display field data in table
import {
    Flex,
    Avatar,
    Text,
    Box,
    Icon,
    Button,
    Heading
} from "@chakra-ui/react";
// Recommended for icons
import { FiUser } from "react-icons/fi";

const Coins = (props) => {

    const [search, Setsearch] = useState('');

    // Control current Page
    const [page, setPage] = React.useState(1);

    // Formatter for each Coin
    const tableDataCoin = (
        props.coins.filter(
            coins => {
                return (
                    coins.name.toLowerCase().includes(search) ||
                    coins.name.includes(search) ||
                    coins.symbol.toLowerCase().includes(search)
                );
            }
        )

            // Add Slice For Pages Pagination
            //.slice((page - 1) * 10, (page - 1) * 10 + 10)
            .map((coin) => (
                {
                    rank: coin.market_cap_rank,
                    name: (
                        <Flex align="center">
                            <Image
                                style={{ display: "inline" }}
                                borderRadius='full'
                                boxSize='40px'
                                src={coin.image}
                                mr="5px"
                            />
                            <Text>{coin.name}</Text>
                        </Flex>
                    ),
                    price: '$' + coin.current_price.toLocaleString(),
                    change_24h: (
                        coin.market_cap_change_percentage_24h.toFixed() >= 0 ?
                            <>
                                <Badge variant='solid' colorScheme='green' style={{ padding: "8px" }}>
                                    +{coin.market_cap_change_percentage_24h.toFixed().length} %
                                </Badge>
                            </>
                            :
                            <>
                                <Badge variant='solid' colorScheme='red' style={{ padding: "8px" }}>
                                    {coin.market_cap_change_percentage_24h.toFixed()} %
                                </Badge>
                            </>
                    ),
                    volume: '$' + coin.total_volume,
                    market_cap: '$' + coin.market_cap,
                    coin_info_page: (
                        <>
                            <Link to={`/coin/${coin.id}`}>
                                <Button colorScheme='teal' variant='solid'>
                                    Details Page
                                </Button>
                            </Link>
                        </>
                    )
                }
            ))
    );
    // Accessor to get a data in Coin object
    const tableColumnsCoin = [
        {
            Header: "Rank",
            accessor: "rank"
        },
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Price",
            accessor: "price"
        },
        {
            Header: "Change (24h)",
            accessor: "change_24h"
        },
        {
            Header: "Volume",
            accessor: "volume"
        },
        {
            Header: "Market Cap",
            accessor: "market_cap"
        },
        {
            Header: "Details Info",
            accessor: "coin_info_page"
        },

    ];

    return (
        <>
            <Carousel />
            <Center>
                <Heading as='h2' size='2xl' my="15px">
                    List of Cryptocurrency Prices by Market Cap
                </Heading>
            </Center>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label></Form.Label>
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
                        <Box p="12">
                            <Box mt="6">
                                <Table
                                    colorScheme="blue"
                                    // Fallback component when list is empty
                                    emptyData={{
                                        icon: FiUser,
                                        text: "Nobody is registered here."
                                    }}
                                    totalRegisters={props.coins.length}
                                    page={page}
                                    // Listen change page event and control the current page using state
                                    onPageChange={(page) => setPage(page)}
                                    columns={tableColumnsCoin}
                                    data={tableDataCoin}
                                />
                            </Box>
                        </Box>
                    </>
            }
        </>
    )
}

export default Coins;