import React from 'react';
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
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'


const CoinItem = (props) => {
    //console.log( coins )
    return (
        <>
            <Tr>
                <Th>
                    {props.coins.market_cap_rank}
                </Th>
                <Th>
                    <Image
                        style={{ display: "inline" }}
                        borderRadius='full'
                        boxSize='60px'
                        src={props.coins.image}
                    />
                    <span style={{ padding: "10px" }}>{props.coins.name} ( {props.coins.symbol.toUpperCase()} )</span>
                </Th>
                <Th>
                    ${props.coins.current_price.toLocaleString()}
                </Th>
                <Th>
                    {
                        props.coins.market_cap_change_percentage_24h.toFixed() > 0 ?
                            <>
                                <Badge variant='solid' colorScheme='green' style={{ padding : "8px" }}>
                                    +{props.coins.market_cap_change_percentage_24h.toFixed().length} %
                                </Badge>
                            </>
                            :
                            <>
                                <Badge variant='solid' colorScheme='red' style={{ padding : "8px" }}>
                                    {props.coins.market_cap_change_percentage_24h.toFixed()} %
                                </Badge>
                            </>
                    }
                </Th>
                <Th>
                    ${props.coins.total_volume}
                </Th>
                <Th>
                    ${props.coins.market_cap}
                </Th>
                <Th>
                    <Link to={`/coin/${props.coins.id}`}>
                        <Button colorScheme='teal' variant='solid'>
                            Details Page
                        </Button>
                    </Link>
                </Th>
            </Tr>
        </>
    )
}

export default CoinItem