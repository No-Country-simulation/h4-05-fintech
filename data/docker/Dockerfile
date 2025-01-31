FROM python:3.13-alpine3.21 AS build

RUN apk upgrade --no-cache && \
    apk add --no-cache gcc g++ python3-dev musl-dev

WORKDIR /source

COPY requirements.txt ./

RUN python3 -m venv ./venv

RUN ./venv/bin/python3 -m ensurepip --upgrade && \
    ./venv/bin/pip install -r ./requirements.txt

# Build the final image
FROM python:3.13-alpine3.21 AS final

WORKDIR /source

RUN apk upgrade --no-cache && \
    apk add --no-cache libgfortran openblas libgomp libstdc++

COPY --from=build /source ./

COPY api ./

CMD ["./venv/bin/uvicorn", "models_app:app", "--host", "0.0.0.0"]