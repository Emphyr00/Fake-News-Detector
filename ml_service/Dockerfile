# base image  
FROM python:3.9   
# setup environment variable  

# set work directory  
RUN mkdir -p /app 

# where your code lives  
WORKDIR /app

# set environment variables  
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

# install dependencies  
RUN pip install --upgrade pip  

# copy whole project to your docker home directory. 
COPY . /app  
# run this command to install all dependencies  
RUN pip install -r requirements.txt  

# start server  
CMD python __init__.py