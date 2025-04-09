# Fleetr

Fleetr is a low-powered GPS solution for fleet management. This repository contains the code for the server that communicates with Fleetr devices, as well as the client for the dashboard.

## Server Overview

The server is built using the following technologies:

- **Node.js**: A JavaScript runtime for building scalable network applications.
- **Express.js**: A minimal and flexible Node.js web application framework for handling HTTP requests.
- **PostgreSQL**: A powerful, open-source relational database system.
- **ngrok**: A tool for exposing local servers to the internet.

## Getting Started

Follow these steps to set up and run the development environment using Docker.

### Prerequisites

- Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

### Environment Variables

Obtain the `.env` file and place it in the root of the project.

### Setup and Run

1. Build and start the Docker containers:

   ```bash
   docker compose up -d --build
   ```

2. Once the containers are running:

   The ngrok service will expose the server to the internet. You can access the ngrok dashboard at http://localhost:4040 to see the live public URL.

3. Verifying the Setup

   1. Open your browser and navigate to http://localhost:4040.
   2. In the ngrok dashboard, you will see the public URL (currently set to Josh's static URL https://sheepdog-intent-kindly.ngrok-free.app) that proxies requests to your local server.
   3. Send SMS pings to the Twilio US number of [+1 (920) 315-8362](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming/PNbe5ff640d8213b2bf3dfe4b186872377/properties) with the format "Latitude, Longitude" (e.g. "1.2917949, 103.7744415").


### Stopping the Containers

To stop the containers, run:

```bash
docker compose down -v
```

This will stop and remove all running containers, along with any volumes created.
