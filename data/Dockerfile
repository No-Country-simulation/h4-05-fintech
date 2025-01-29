FROM python:3.11

WORKDIR /model 

COPY ./requirements.txt ./requirements.txt

RUN pip install --no-cache-dir -r /code/requirements.txt

COPY ./api ./api 

CMD ["uvicorn", "models_app:app", "--host", "0.0.0.0", "--port", "8000"]

