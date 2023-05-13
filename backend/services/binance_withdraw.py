import ccxt
from helpers.logger import Logger


def binance_withdraw(api_key, api_secret, address, amount, token, network):
    account_binance = ccxt.binance(
        {
            "apiKey": api_key,
            "secret": api_secret,
            "enableRateLimit": True,
            "options": {"defaultType": "spot"},
        }
    )

    logger = Logger("binance_withdraw.log")

    try:
        account_binance.withdraw(
            code=token,
            amount=amount,
            address=address,
            tag=None,
            params={"network": network},
        )
        logger.append(f">>> Success | {address} | {amount}")
    except Exception as error:
        logger.append(f">>> Fail | {address} | error : {error}")
