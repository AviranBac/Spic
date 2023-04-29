FROM python:3.11.3-slim-bullseye
EXPOSE 8000
COPY ./ /usr/pythonTest
WORKDIR /usr/pythonTest/app
RUN pip install -r ../requirements
CMD uvicorn main:app --host 0.0.0.0 --port 8000