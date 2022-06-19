FROM python:3.8

RUN adduser --home /sandbox/python/files bruh
WORKDIR /sandbox/python

COPY python/requirements.txt .
RUN pip install -r requirements.txt

COPY run.sh .
RUN chmod 555 run.sh

USER bruh

CMD ["./run.sh"]