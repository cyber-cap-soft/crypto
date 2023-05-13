import axios from "axios";

const HOST = "http://localhost:8000";

export const binanceWithdraw = (
  apiKey: string,
  apiSecret: string,
  token: string,
  network: string,
  amountFrom: number,
  amountTo: number,
  wallets: string[]
) => {
  axios.post(`${HOST}/binance-withdraw`, {
    apiKey,
    apiSecret,
    token,
    network,
    amountFrom,
    amountTo,
    wallets,
  });
};

export const getBinanceWithdrawStatus = async () => {
  const res = await axios.get(`${HOST}/binance-withdraw`);

  return res.data;
};
