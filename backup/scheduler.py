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
DBUSER = os.getenv('DBUSER')
DBPASSWORD = os.getenv('DBPASSWORD')
DBHOST = os.getenv('DBHOST')
DBPORT = os.getenv('DBPORT')

def dictfetchall(cursor):
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]

def getBitcoinInfo():
    return [] 

def analyze(cursor):
    for quota in getBitcoinInfo(cursor):
        try:
            new_state = get_quota_state(quota)
            cursor.execute(
                "UPDATE quotas.storekeeper_quotas SET quota_state_id = '{0}' where id = {1}"
            .format(new_state, quota['id']))
            print(quota, new_state)
        except Exception as e:
            print(e.message)
    print("End looking on bitso ...")

def init():
    gyconnector = psycopg2.connect(database = DBNAME, user = DBUSER, password = DBPASSWORD, host = DBHOST, port = DBPORT)
    gyconnector.autocommit = True
    cursor = gyconnector.cursor()
    analyze(cursor)
    gyconnector.close()

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
scheduler.add_job(init, 'cron', minute=MINUTES)
scheduler.start()