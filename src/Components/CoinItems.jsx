import React from 'react'

//import './Coins.css'

const CoinItem = (props) => {
    return (
        <>
            <tr>
                <td>
                    {props.coins.market_cap_rank}
                </td>
                <td>
                    <img src={props.coins.image} alt="" />
                    {props.coins.name} ( {props.coins.symbol.toUpperCase()} )
                </td>
                <td>
                    {props.coins.current_price.toLocaleString()}
                </td>
                <td>
                    {props.coins.market_cap_change_percentage_24h.toFixed()} %
                </td>
                <td>
                    {props.coins.total_volume}
                </td>
                <td>
                    {props.coins.market_cap}
                </td>
            </tr>
        </>
    )
}

export default CoinItem