import React, { useState } from 'react';
import CoinItems from './CoinItems';
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
import { FiTrash2, FiUser } from "react-icons/fi";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";
import axios from "axios";

type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    avatar_url: string;
};

// Example list of users
// Generated using https://www.mockaroo.com/
const users: User[] = [
    {
        id: 1,
        name: "Carlin Gwinn",
        email: "cgwinn0@buzzfeed.com",
        phone: "(684) 9842794",
        birthday: "04/11/2009",
        avatar_url:
            "https://robohash.org/assumendanihilodio.png?size=50x50&set=set1"
    },
    {
        id: 2,
        name: "Yetta Snape",
        email: "ysnape1@princeton.edu",
        phone: "(645) 8617506",
        birthday: "06/08/1989",
        avatar_url:
            "https://robohash.org/liberorationequasi.png?size=50x50&set=set1"
    },
    {
        id: 3,
        name: "Letti Shingfield",
        email: "lshingfield2@sogou.com",
        phone: "(465) 1994297",
        birthday: "06/02/2004",
        avatar_url: "https://robohash.org/quiquidolorem.png?size=50x50&set=set1"
    },
    {
        id: 4,
        name: "Edsel Glencrash",
        email: "eglencrash3@mlb.com",
        phone: "(716) 4216591",
        birthday: "10/19/1994",
        avatar_url: "https://robohash.org/voluptasnoneum.png?size=50x50&set=set1"
    },
    {
        id: 5,
        name: "Kaleb Panter",
        email: "kpanter4@deliciousdays.com",
        phone: "(645) 9393804",
        birthday: "12/24/2014",
        avatar_url:
            "https://robohash.org/blanditiisdoloribuslibero.png?size=50x50&set=set1"
    },
    {
        id: 6,
        name: "Andrei Pegrum",
        email: "apegrum5@vistaprint.com",
        phone: "(587) 1114510",
        birthday: "06/07/1983",
        avatar_url:
            "https://robohash.org/delectusvelvoluptas.png?size=50x50&set=set1"
    },
    {
        id: 7,
        name: "Kania Andreucci",
        email: "kandreucci6@aol.com",
        phone: "(346) 7306775",
        birthday: "09/03/1993",
        avatar_url:
            "https://robohash.org/utveritatismolestias.png?size=50x50&set=set1"
    },
    {
        id: 8,
        name: "Luz Showers",
        email: "lshowers7@cam.ac.uk",
        phone: "(571) 7061743",
        birthday: "05/30/1998",
        avatar_url:
            "https://robohash.org/liberomolestiaevel.png?size=50x50&set=set1"
    },
    {
        id: 9,
        name: "Danya Harbron",
        email: "dharbron8@yale.edu",
        phone: "(908) 5621872",
        birthday: "11/02/2003",
        avatar_url: "https://robohash.org/quoducimuscumque.png?size=50x50&set=set1"
    },
    {
        id: 10,
        name: "Alf Ibbotson",
        email: "aibbotson9@mozilla.com",
        phone: "(739) 4103240",
        birthday: "02/28/2007",
        avatar_url:
            "https://robohash.org/temporibussintmollitia.png?size=50x50&set=set1"
    },
    {
        id: 11,
        name: "Aurel McCamish",
        email: "amccamisha@soup.io",
        phone: "(352) 9149861",
        birthday: "03/13/1993",
        avatar_url: "https://robohash.org/laboreteneturut.png?size=50x50&set=set1"
    },
    {
        id: 12,
        name: "Jarrad Jerrans",
        email: "jjerransb@mail.ru",
        phone: "(568) 7793952",
        birthday: "05/25/1989",
        avatar_url:
            "https://robohash.org/voluptasoditrepellendus.png?size=50x50&set=set1"
    },
    {
        id: 13,
        name: "Adams Swyer-Sexey",
        email: "aswyersexeyc@meetup.com",
        phone: "(682) 4005822",
        birthday: "12/31/1984",
        avatar_url:
            "https://robohash.org/molestiaeatqueincidunt.png?size=50x50&set=set1"
    },
    {
        id: 14,
        name: "Gladi Coxhell",
        email: "gcoxhelld@sciencedaily.com",
        phone: "(321) 6811254",
        birthday: "10/21/2009",
        avatar_url:
            "https://robohash.org/perspiciatissitreprehenderit.png?size=50x50&set=set1"
    },
    {
        id: 15,
        name: "Felecia Yitzovicz",
        email: "fyitzovicze@cnet.com",
        phone: "(465) 9054540",
        birthday: "04/30/1982",
        avatar_url: "https://robohash.org/undevelitdolor.png?size=50x50&set=set1"
    }
];

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
                        {/* <TableContainer>
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

                                            .slice((page - 1) * 10, (page - 1) * 10 + 10)

                                            .map(coins => {
                                                return (
                                                    <>
                                                        <CoinItems coins={coins} key={coins.id} />
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
                        </TableContainer> */}

                        <Box p="12">
                            <Heading size="sm" as="h3">
                                List of Cryptocurrency Prices by Market Cap
                            </Heading>
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

                        <div className='my-5 py-5'>
                            Table I Am Working On
                            {
                                props.coins.filter(
                                    coins => {
                                        return (
                                            coins.name.toLowerCase().includes(search) ||
                                            coins.name.includes(search) ||
                                            coins.symbol.toLowerCase().includes(search)
                                        );
                                    })

                                    .slice((page - 1) * 10, (page - 1) * 10 + 10)

                                    .map(coins => {
                                        return (
                                            <>
                                                <CoinItems coins={coins} key={coins.id} />
                                            </>
                                        )
                                    })
                            }
                        </div>
                        <table className="table-primary">
                            <thead>
                                <tr>
                                    <th> # </th>
                                    <th> Coin Name </th>
                                    <th> Price </th>
                                    <th> Change (24h) </th>
                                    <th> Volume </th>
                                    <th> Mkt Cap </th>
                                    <th> Details Info </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.coins.filter(
                                        coins => {
                                            return (
                                                coins.name.toLowerCase().includes(search) ||
                                                coins.name.includes(search) ||
                                                coins.symbol.toLowerCase().includes(search)
                                            );
                                        })
                                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                        .map(coins => {
                                            return (
                                                <>
                                                    <CoinItems coins={coins} key={coins.id} />
                                                </>
                                            )
                                        })
                                }
                            </tbody>
                        </table>
                    </>
            }
        </>
    )
}

export default Coins;