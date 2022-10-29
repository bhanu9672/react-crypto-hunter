import React from 'react';
import CoinItems from './CoinItems';
import Coin from '../routes/Coin';

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
} from '@chakra-ui/react'

const Coins = (props) => {
    return (
        <>
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
                        <TableContainer>
                            <Table variant='simple'>
                                <TableCaption>Imperial to metric conversion factors</TableCaption>
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
                                        props.coins.map((coins) => {
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