from apscheduler.schedulers import background

scheduler = background.BlockingScheduler()

def minute_schedule():
    for i in range(100):
        print("scheduler run started.")

scheduler.add_job(minute_schedule, 'interval', seconds=5)
scheduler.start()