# Fleetr

Fleetr is a low-powered GPS solution for fleet management. This repository contains the code for the firmware to be flashed onto the embedded (Fleetr) device, the server that communicates with Fleetr devices, as well as the client for the dashboard.

## Firmware

The `firmware/` subdirectory contains the code that runs on the ESP32 microcontroller. It includes:

- **`chargerless_gps`**: This is the final production firmware for Fleetr devices. It can be flashed onto the ESP32 using the [Arduino IDE](https://www.arduino.cc/en/software) with a baud rate of `115200 bps`. Once flashed, the firmware will automatically initialize and begin execution when the device is powered.

- **`unit_tests`**: This directory contains test firmware used during development to validate specific modules and functionality of the Fleetr system.

To flash the firmware:

1. Open the Arduino IDE.
2. Load the `chargerless_gps` project.
3. Connect your ESP32 to your computer via USB.
4. Select the correct board and port from the **Tools** menu.
5. Set the baud rate to `115200`.
6. Upload the firmware.
7. Once uploaded, the program will begin running automatically upon receiving power.

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
