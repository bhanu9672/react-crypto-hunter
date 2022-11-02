import axios from 'axios'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import DOMPurify from 'dompurify'
import './Coin.css'
import { Button, Text } from '@chakra-ui/react'
import { useUserAuth } from '../Context/UserAuthContext';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"
import {
    useToast,
} from '@chakra-ui/react'

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

    return (
        <>
            <div className='coin-container'>
                <div className='content'>
                    <h1>{coin.name}</h1>
                </div>
                <div className='content'>
                    <div className='rank'>
                        <span className='rank-btn'>Rank # {coin.market_cap_rank}</span>
                    </div>
                    <div className='info'>
                        <div className='coin-heading'>
                            {coin.image ? <img src={coin.image.small} alt='' /> : null}
                            <p>{coin.name}</p>
                        </div>
                        <div className='coin-price'>
                            {coin.market_data?.current_price ? <h1>${coin.market_data.current_price.usd.toLocaleString()}</h1> : null}
                        </div>
                        {
                            user && (
                                <Button
                                    colorScheme={inWatchlist ? 'red' : 'teal'}
                                    variant='solid'
                                    onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}>
                                    {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                                </Button>
                            )
                        }
                    </div>
                </div>
                <div className='content'>
                    <table>
                        <thead>
                            <tr>
                                <th>1h</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>14d</th>
                                <th>30d</th>
                                <th>1yr</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{coin.market_data?.price_change_percentage_1h_in_currency ? <p>{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p> : null}</td>
                                <td>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p> : null}</td>
                                <td>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                                <td>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                                <td>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                                <td>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%</p> : null}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='content'>
                    <div className='stats'>
                        <div className='left'>
                            <div className='row'>
                                <h4>24 Hour Low</h4>
                                {coin.market_data?.low_24h ? <p>${coin.market_data.low_24h.usd.toLocaleString()}</p> : null}
                            </div>
                            <div className='row'>
                                <h4>24 Hour High</h4>
                                {coin.market_data?.high_24h ? <p>${coin.market_data.high_24h.usd.toLocaleString()}</p> : null}
                            </div>
                        </div>
                        <div className='right'>
                            <div className='row'>
                                <h4>Market Cap</h4>
                                {coin.market_data?.market_cap ? <p>${coin.market_data.market_cap.usd.toLocaleString()}</p> : null}
                            </div>
                            <div className='row'>
                                <h4>Circulating Supply</h4>
                                {coin.market_data ? <p>{coin.market_data.circulating_supply}</p> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='about'>
                        <Text fontSize='2xl' my="15px">
                            About {coin.name} ( {coin.symbol} )
                        </Text>
                        <p dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(coin.description ? coin.description.en : ''),
                        }}>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Coin;