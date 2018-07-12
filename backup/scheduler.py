from apscheduler.schedulers.blocking import BlockingScheduler

import datetime, csv, json,requests,  os, sys, argparse
from os.path import join, dirname
from dotenv import load_dotenv
from pytz import utc

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

BITSO_API = os.getenv('BITSO_API') + '/v3/ticker/'
EXCHANGE_API = os.getenv('BACKUP_API') + '/exchange'
AUTHORIZATION = os.getenv('AUTHORIZATION')
MINUTES = 10

books = [
    "btc_mxn", "eth_mxn", "xrp_btc", "xrp_mxn", "eth_btc", "ltc_btc", "ltc_mxn", "bch_mxn", "tusd_btc", "tusd_mxn"
]

def getExchange(book):
    response = requests.request(
        "GET", BITSO_API, params={"book":book}
    )
    return json.loads(response.text)

def postExchange(payload):
    payloadToSave = {
        'high': payload['high'],
        'last': payload['last'],
        'created_at': payload['created_at'],
        'book': payload['book'],
        'volume': payload['volume'],
        'vwap': payload['vwap'],
        'low': payload['low'],
        'ask': payload['ask'],
        'bid': payload['bid']
    }
    response = requests.request(
        "POST", EXCHANGE_API, data=payloadToSave
    )
    return json.loads(response.text)

def analyze():
    for book in books:
        try:
            data = getExchange(book)
            print(data)
            insert = postExchange(data['payload'])
            print(insert)
        except Exception as e:
            print(e)

analyze()
print("Cron Started ...")

scheduler = BlockingScheduler()
scheduler.add_job(analyze, 'cron', minute=MINUTES)
scheduler.start()