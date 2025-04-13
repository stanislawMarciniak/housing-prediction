FROM python:3.7-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE $PORT
CMD gunicorn --workers=4 --bind 0.0.0.0:${PORT:-5000} app:app