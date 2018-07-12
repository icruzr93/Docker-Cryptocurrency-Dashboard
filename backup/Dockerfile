# use base python image with python 2.7
FROM python:3.6.4

# Create app directory
RUN mkdir -p /home/src/app
WORKDIR /home/src/app

# add files to image
COPY requirements.txt /home/src/app/
COPY scheduler.py /home/src/app/

# Bundle app source
COPY . /home/src/app/

# install python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Set the timezone.
RUN echo "UTC" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

CMD ["python", "scheduler.py"]