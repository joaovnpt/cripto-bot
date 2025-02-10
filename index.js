const axios = require("axios");

const SYMBOL = "BTCUSDT";
const BUY_PRICE = 95900;
const SELL_PRICE = 96600;

const TEST_API_URL = "http://testnet.binance.vision";

let isOpenned = false; //Estar aberto, na linguagem trader é ter comprado uma ação

async function start() {
  const { data } = await axios.get(
    TEST_API_URL + "/api/v3/klines?limit=21&interval=15m&symbol=" + SYMBOL
  );
  const candle = data[data.length - 1];
  const price = parseFloat(candle[4]);
  console.clear();
  console.log("BTC Price : " + price);
  setTimeout(() => console.log("Refreshing..."), 500);


  if (price <= BUY_PRICE && isOpenned === false) {
    isOpenned = true;
    console.log("buying...");
  } else if (price >= SELL_PRICE && isOpenned === true) {
    isOpenned = false
    console.log("selling...");
  } else {
    console.log('waiting')
  }
}

setInterval(start, 1000);
