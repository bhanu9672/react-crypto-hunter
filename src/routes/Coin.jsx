import axios from 'axios'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import DOMPurify from 'dompurify'
import './Coin.css'
import { Box, Button, Text, Badge } from '@chakra-ui/react'
import { useUserAuth } from '../Context/UserAuthContext';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"
import {
    useToast,
    Image,
    Heading,
    Highlight,
    Stack,
    Skeleton,
} from '@chakra-ui/react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Coin = () => {

    const toast = useToast()
    const toastIdRef = React.useRef()

    const [coin, setCoin] = useState({});
    const params = useParams();
    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`

    useEffect(() => {
        axios.get(url).then((res) => {
            setCoin(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const { user, watchlist } = useUserAuth();
    const inWatchlist = watchlist.includes(coin?.id);

    const addToWatchlist = async () => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(coinRef, {
                coins: watchlist ? [...watchlist, coin.id] : [coin?.id],
            });
            toastIdRef.current = toast({
                //title: 'Account created.',
                description: `${coin.name} is add Your watchlist`,
                status: 'success',
                duration: 4000,
                position: 'top',
                isClosable: true,
            })
        } catch (error) {
        }
    }

    const removeFromWatchlist = async () => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(coinRef, {
                coins: watchlist.filter((watch) => watch !== coin.id)
            },
                { merge: "true" }
            );
            toastIdRef.current = toast({
                //title: 'Account created.',
                description: `${coin.name} Removed from the Watchlist.`,
                status: 'success',
                duration: 5000,
                position: 'top',
                isClosable: true,
            })
        } catch (error) {
        }
    }

    console.log("coin :- " + coin.name)
    console.table("coin :- " + coin)

    return (
        <>
            <Row className="justify-content-md-center my-5">
                <Col lg="11">
                    <Row className='coin-container'>
                        <Col lg="6">
                            <Text fontSize='xl' fontWeight='bold'>
                                {coin.image ? <> <Image display="inline-flex" boxSize='50px' src={coin.image.small} alt='Dan Abramov' /> </> : "Coin Image Not Found."}
                                <span>{coin.name}</span>
                                <span style={{ textTransform: "uppercase" }}> ( {coin.symbol} )</span>
                                <Badge ml='1' fontSize='0.8em' colorScheme='green'>
                                    Rank # {coin.market_cap_rank}
                                </Badge>
                            </Text>
                        </Col>
                        <Col lg="6">
                            <Row>
                                <Col>
                                    {
                                        user && (
                                            <div className='text-center text-lg-left mt-2 mt-lg-0'>
                                                <Button
                                                    className='text-center text-lg-left'
                                                    colorScheme={inWatchlist ? 'red' : 'teal'}
                                                    variant='solid'
                                                    onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}>
                                                    {inWatchlist ? "Remove From Watchlist" : "Add To Watchlist"}
                                                </Button>
                                            </div>
                                        )
                                    }
                                </Col>
                                <Col>
                                    {
                                        coin.market_data?.current_price ?
                                            <>
                                                <div className='text-center text-lg-left mt-2 mt-lg-0'>
                                                    <Text fontSize='xl' fontWeight='bold'>
                                                        <Badge variant='outline' fontSize='1em' colorScheme='green'>
                                                            Current Price :
                                                            ${coin.market_data.current_price.usd.toLocaleString()}
                                                        </Badge>
                                                    </Text>
                                                </div>
                                            </>

                                            : null
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col className='my-2' lg="6">
                            <Row>
                                <Col>
                                    <Text fontSize='2xl'> 1h </Text>
                                    <Text fontSize='xl'>
                                        {coin.market_data?.price_change_percentage_1h_in_currency ? <p>{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p> : null}
                                    </Text>
                                </Col>
                                <Col>
                                    <Text fontSize='2xl'> 24h </Text>
                                    <Text fontSize='xl'>
                                        {coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p> : null}
                                    </Text>
                                </Col>
                                <Col>
                                    <Text fontSize='2xl'> 7d </Text>
                                    <Text fontSize='xl'>
                                        {coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p> : null}
                                    </Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='my-2' lg="6">
                            <Row>
                                <Col>
                                    <Text fontSize='2xl'> 14d </Text>
                                    <Text fontSize='xl'>
                                        {coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p> : null}
                                    </Text>
                                </Col>
                                <Col>
                                    <Text fontSize='2xl'> 30d </Text>
                                    <Text fontSize='xl'> {coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p> : null} </Text>
                                </Col>
                                <Col>
                                    <Text fontSize='2xl'> 1yr </Text>
                                    <Text fontSize='xl'> {coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%</p> : null} </Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="6">
                            <div className='left'>
                                <div className='row'>
                                    <Heading lineHeight='tall'>
                                        <Highlight
                                            query={['24 Hour Low']}
                                            styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100', fontWeight: 'normal', fontSize: "18px" }}
                                        >
                                            24 Hour Low
                                        </Highlight>
                                    </Heading>
                                    <Text fontSize='2xl'>{coin.market_data?.low_24h ? <p>${coin.market_data.low_24h.usd.toLocaleString()}</p> : null}</Text>
                                </div>
                                <hr />
                                <div className='row'>
                                    <Heading lineHeight='tall'>
                                        <Highlight
                                            query={['24 Hour High']}
                                            styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100', fontWeight: 'normal', fontSize: "18px" }}
                                        >
                                            24 Hour High
                                        </Highlight>
                                    </Heading>
                                    <Text fontSize='2xl'>{coin.market_data?.high_24h ? <p>${coin.market_data.high_24h.usd.toLocaleString()}</p> : null} </Text>
                                </div>
                                <hr />
                            </div>
                        </Col>
                        <Col lg="6">
                            <div className='right'>
                                <div className='row'>
                                    <Heading lineHeight='tall'>
                                        <Highlight
                                            query={['Market Cap']}
                                            styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100', fontWeight: 'normal', fontSize: "18px" }}
                                        >
                                            Market Cap
                                        </Highlight>
                                    </Heading>
                                    <Text fontSize='2xl'>{coin.market_data?.market_cap ? <p>${coin.market_data.market_cap.usd.toLocaleString()}</p> : null} </Text>
                                </div>
                                <hr />
                                <div className='row'>
                                    <Heading lineHeight='tall'>
                                        <Highlight
                                            query={['Circulating Supply']}
                                            styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100', fontWeight: 'normal', fontSize: "18px" }}
                                        >
                                            Circulating Supply
                                        </Highlight>
                                    </Heading>
                                    <Text fontSize='2xl'>{coin.market_data ? <p>{coin.market_data.circulating_supply}</p> : null} </Text>
                                </div>
                                <hr />
                            </div>
                        </Col>
                        <Col>
                            <Text fontSize='2xl' my="15px">
                                <Heading noOfLines={1}>
                                    About {coin.name} <span style={{ textTransform: "uppercase" }}> ( {coin.symbol} ) </span>
                                </Heading>
                            </Text>
                            <Text fontSize='lg' dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(coin.description ? coin.description.en : ''),
                            }}>
                            </Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Coin;