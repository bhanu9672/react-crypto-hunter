import React, { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {  Routes,Route } from "react-router-dom"
import Coins from "./Components/Coins";
import Container from 'react-bootstrap/Container';
import Header from "./Components/Header";
import Coin from "./routes/Coin";

function App() {

  const [coins, setCoins] = useState([])
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
      // console.log(response.data[0])
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  // console.table( coins );

  return (
    <>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={ <Coins coins={coins} /> } />
          <Route path="/coin" element={ <Coin /> } />
          <Route path='/coin/:coinId' element={ <Coin /> } />
        </Routes>
      </Container>
    </>
  );
}

export default App;
