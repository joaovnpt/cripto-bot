const axios = require("axios");

const SYMBOL = "BTCUSDT";
const PERIOD = 14;

const TEST_API_URL = "http://testnet.binance.vision";

function averages(prices, period, startIndex) {
  let gains = 0,
    losses = 0;

  for (let i = 0; i < period && i + startIndex < prices.length; i++) {
    const diff = prices[i + startIndex] - prices[i + startIndex - 1];
    if (diff >= 0) 
      gains += diff;
    else 
      losses += Math.abs(diff);
  }

  let avgGains = gains / period
  let avgLosses = losses / period
  return { avgGains, avgLosses }
}

let isOpenned = false; //Estar aberto, na linguagem trader é ter comprado uma ação

async function start() {
  const { data } = await axios.get(
    TEST_API_URL + "/api/v3/klines?limit=100&interval=15m&symbol=" + SYMBOL
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
    isOpenned = false;
    console.log("selling...");
  } else {
    console.log("waiting");
  }
}

setInterval(start, 3000);
