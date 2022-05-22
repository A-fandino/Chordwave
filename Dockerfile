FROM node:16-alpine as client
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./client/package.json ./client/package-lock.json ./
ADD ./client ./
RUN npm install
RUN npm run build


FROM python:3

WORKDIR /var/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
COPY --from=client /app/dist ./client/dist
CMD ["python", "run.py"]
