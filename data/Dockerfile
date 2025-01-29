# Evitar librerías relacionadas con Windows: pywin32, pywinpty
FROM python:3.13.1-alpine AS build

# RUN apt-get update && apt-get install -y \
#     build-essential \
#     python3-dev \
#     libffi-dev \
#     rustc \
#     cargo

RUN apk upgrade --no-cache
RUN apk add --no-cache gcc g++ musl-dev python3-dev libffi-dev openssl-dev cargo 

RUN cargo --version
RUN gcc --version
RUN g++ --version
RUN python3 --version
RUN apk info libffi-dev
RUN apk info openssl-dev

WORKDIR /source

COPY requirements.txt ./

RUN pip install --no-cache-dir -r ./requirements.txt

RUN apk upgrade --no-cache

COPY API ./
COPY notebooks ./
COPY data ./

ENTRYPOINT [ "/source/API", "models_app.py" ]

CMD ["cd", "API/", "&&" "uvicorn", "models_app:app", "--host", "0.0.0.0", "--port", "8000"]

