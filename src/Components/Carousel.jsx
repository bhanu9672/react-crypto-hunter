import React, { Component } from 'react';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { Image, Badge } from '@chakra-ui/react'
import axios from "axios";
import { Heading, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react'

const Carousel = () => {

    const [trandings, SetTrandings] = React.useState([])
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'

    React.useEffect(() => {
        axios.get(url).then((response) => {
            SetTrandings(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    console.table(trandings);
    console.log(trandings);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000
    };

    return (
        <>
            <div className='text-center my-5'>
                <Heading mb={4}>Crypto Hunter</Heading>
                <Heading as='h5' size='md'>
                    Get All The Info Regarding Your Favorite Crypto Currency
                </Heading>
            </div>
            {
                trandings.length > 0 ?
                    <Slider {...settings}>
                        {
                            trandings.map((tranding) =>
                                <>
                                    <div key={tranding.id}>
                                        <Link to={`/coin/${tranding.id}`}>
                                            <Image
                                                borderRadius='full'
                                                boxSize='120px'
                                                src={tranding.image}
                                                alt={tranding.name}
                                            />
                                            <Text fontSize='1xl' my="5px">{tranding.name} ( {tranding.symbol} )</Text>
                                            <Text fontSize='xl' my="5px">$ {tranding.current_price}</Text>
                                            {
                                                tranding.market_cap_change_percentage_24h >= 0 ?
                                                    <>
                                                        <Badge variant='solid' colorScheme='green' style={{ padding: "8px" }}>
                                                            {tranding.market_cap_change_percentage_24h}
                                                        </Badge>
                                                    </>
                                                    :
                                                    <>
                                                        <Badge variant='solid' colorScheme='red' style={{ padding: "8px" }}>
                                                            {tranding.market_cap_change_percentage_24h}
                                                        </Badge>
                                                    </>
                                            }
                                        </Link>
                                    </div>
                                </>
                            )
                        }
                    </Slider> :
                    <>
                        <Stack>
                            <Skeleton height='20px' />
                            <Skeleton height='20px' />
                            <Skeleton height='20px' />
                        </Stack>
                    </>
            }
        </>
    )
}

export default Carousel
