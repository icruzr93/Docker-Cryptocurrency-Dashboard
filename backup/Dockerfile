# use base python image with python 2.7
FROM python:2.7

# add files to image
ADD requirements.txt requirements.txt
ADD scheduler.py scheduler.py

# install python dependencies
RUN pip install -r requirements.txt

# Set the timezone.
RUN echo "UTC" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

CMD ["python", "scheduler.py"]