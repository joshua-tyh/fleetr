# Fleetr

Fleetr is a low-powered GPS solution for fleet management. This repository contains the code for the server that communicates with Fleetr devices, as well as the client for the dashboard.

## Server Overview

The server is built using the following technologies:

- **Node.js**: A JavaScript runtime for building scalable network applications.
- **Express.js**: A minimal and flexible Node.js web application framework for handling HTTP requests.

The server listens on port `8080` and provides an endpoint (`/`) that currently responds with a simple "Hello World!" message.

## Getting Started

Follow these steps to set up and run the development environment:

### Prerequisites

- Install [Node.js](https://nodejs.org/) (v16 or higher recommended).
- Install [ngrok](https://ngrok.com/) for exposing local servers to the internet.

### Installation

1. Navigate to the `server` directory:
   ```sh
   cd server
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Server

1. Start the server:
   ```sh
   npm run start
   ```
   This will start the server on `http://localhost:8080`.
2. In a seperate terminal, expose the server using ngrok:
   ```sh
   npm run ngrok
   ```
   Once the server is running, you can visit the proxied public URL provided by ngrok in your browser to see the "Hello World!" response.
