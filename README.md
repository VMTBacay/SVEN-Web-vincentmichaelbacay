# PAWTASTIC - Pet Care Appointment Scheduler

A web application for scheduling pet care services. Built with Laravel and React, styled with custom CSS.

## Getting Started

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/VMTBacay/SVEN-Web-vincentmichaelbacay.git
   cd SVEN-Web-vincentmichaelbacay
   ```

2. Install backend dependencies
   ```bash
   composer install
   ```

3. Create and configure environment file
   ```bash
   cp .env.example .env
   ```

4. Generate application key
   ```bash
   php artisan key:generate
   ```

5. Update database configuration in `.env`
   ```plaintext
   DB_CONNECTION=mysql
   DB_HOST=db
   DB_PORT=3306
   DB_DATABASE=pet_appointments
   DB_USERNAME=root
   DB_PASSWORD=root
   ```

5. Build and start Docker containers
   ```bash
   docker-compose build
   docker-compose up -d
   ```

6. Run database migrations
   ```bash
   docker exec -it pet-laravel php artisan migrate
   ```

7. Start the Laravel development server
   ```bash
   docker exec -it pet-laravel php artisan serve --host='0.0.0.0'
   ```

8. Set up frontend
   ```bash
   cd frontend
   npm install
   ```

9. Make the `.env` file and configure the frontend environment
   ```bash
   touch .env
   echo "REACT_APP_API_URL=http://localhost:8000/api" > .env
   ```

10. Start the React development server
    ```bash
    npm start
    ```

The application will be available at `http://localhost:3000`

#### Possible Snag

The front end `.env` file not cooperating, leading to failed form submissions. In this case, try recreating it and restarting the server.
