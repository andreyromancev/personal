FROM python:3

WORKDIR /app

COPY requirements.txt .
RUN pip install -r /app/requirements.txt

COPY . .

EXPOSE 8080

ENTRYPOINT ["python"]
CMD ["app.py"]
