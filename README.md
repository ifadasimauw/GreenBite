# GreenBite

GreenBite is a subscription-based platform for ordering healthy meals, offering users flexible subscription plans and meal customization options. Designed to promote a nutritious lifestyle, GreenBite ensures convenient meal delivery with efficient tracking.

## Features

- Subscribe to healthy meal plans
- Customize meals based on dietary preferences
- Track meal deliveries in real-time
- Manage subscriptions through a user-friendly interface
- Secure payment integration with trusted gateways

## Installation

### Prerequisites

- Node.js (version 20 or later)
- MongoDB (for data management)

### Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/greenbite.git
    cd greenbite
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the MongoDB service:
    ```bash
    mongod
    ```

4. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add required variables like `DATABASE_URL` and payment API keys.

5. Run the application:
    ```bash
    npm start
    ```

## API Endpoints

- **POST** `/subscriptions`: Create a new subscription
- **GET** `/subscriptions`: Retrieve all subscriptions
- **GET** `/subscriptions/:id`: Retrieve a subscription by ID
- **PUT** `/subscriptions/:id`: Update subscription details
- **DELETE** `/subscriptions/:id`: Cancel a subscription
- **GET** `/meals`: Retrieve available meal plans
- **POST** `/payments`: Process a payment for a subscription

## License

This project is licensed under the MIT License.
