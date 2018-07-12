import datetime, psycopg2, csv, json,requests,  os, sys, argparse
from os.path import join, dirname
from dotenv import load_dotenv
from pytz import utc

from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from apscheduler.executors.pool import ProcessPoolExecutor
from apscheduler.executors.pool import ThreadPoolExecutor

parser = argparse.ArgumentParser()
parser.add_argument('-mi','--minutes', help='Minutes',required=True)
args = parser.parse_args()

MINUTES = int(args.minutes)

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

DBNAME = os.getenv('DBNAME')

def getBitcoinInfo():
    return [] 

def analyze(cursor):
    for quota in getBitcoinInfo(cursor):
        try:
            print(quota)
        except Exception as e:
            print(e.message)
    print("End looking on bitso ...")

print("Cron Started ...")

jobstores = {
    'default': SQLAlchemyJobStore(url='sqlite:///jobs.sqlite')
}
executors = {
    'default': ThreadPoolExecutor(20),
    'processpool': ProcessPoolExecutor(5)
}
job_defaults = {
    'coalesce': False,
    'max_instances': 10
}
scheduler = BlockingScheduler(executors=executors, job_defaults=job_defaults, timezone=utc)
scheduler.add_job(analyze, 'cron', minute=MINUTES)
scheduler.start()