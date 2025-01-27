
FROM python:3.10
WORKDIR /gamma
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV PYTHONPATH=/gamma 
CMD ["python3", "-m", "split_slides.main"]

