FROM python:3.11.3-slim-bullseye
EXPOSE 8000
COPY ./ /usr/pythonTest
WORKDIR /usr/pythonTest/app
RUN pip install -r ../requirements
CMD python main.py