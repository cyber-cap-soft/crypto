from typing import List
from schemas.camel_model import CamelModel


class BinanceWithdrawIn(CamelModel):
    api_key: str
    api_secret: str
    token: str
    network: str
    amount_from: float
    amount_to: float
    wallets: List[str]
