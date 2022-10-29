import React from 'react';
import Table from 'react-bootstrap/Table';
import CoinItems from './CoinItems';
import Coin from '../routes/Coin';
import {Link} from "react-router-dom"

const Coins = (props) => {
    console.log(props.coins.image)
    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Coins</th>
                        <th>Price</th>
                        <th>24h</th>
                        <th>Volume</th>
                        <th>Mkt Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.coins.map((coins) => {
                            return (
                                <>
                                    <Link to={ `/coin/${coins.id}` } element={<Coin />} key={coins.id} >
                                        <CoinItems coins={coins} key={coins.id} />
                                    </Link>
                                </>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Coins