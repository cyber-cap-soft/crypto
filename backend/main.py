import uvicorn
from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware

from services.binance_withdraw_to_many import binance_withdraw_to_many
from helpers.logger import Logger
from schemas.binance_withdraw_in import BinanceWithdrawIn


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/binance-withdraw")
def binance_withdraw(data: BinanceWithdrawIn):
    binance_withdraw_to_many(
        data.api_key,
        data.api_secret,
        data.wallets,
        data.amount_from,
        data.amount_to,
        data.token,
        data.network,
    )

    return Response("Success", status.HTTP_201_CREATED)


@app.get("/binance-withdraw")
def get_binance_withdraw_status():
    return Logger("binance_withdraw.log").read()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
