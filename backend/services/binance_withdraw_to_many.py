from time import sleep
from random import uniform, randint
from helpers.logger import Logger
from services.binance_withdraw import binance_withdraw


def binance_withdraw_to_many(
    api_key, api_secret, wallets, amount_from, amount_to, token, network
):
    logger = Logger("binance_withdraw.log")
    logger.clear()
    logger.append("/// Start withdrawing...")

    for wallet in wallets:
        sleep(randint(3, 10))
        amount = round(uniform(amount_from, amount_to), 6)
        binance_withdraw(api_key, api_secret, wallet, amount, token, network)

    logger.append("/// Done!")
