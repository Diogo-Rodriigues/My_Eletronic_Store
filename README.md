# My Electronic Store

## Introduction
My Electronic Store is a full-stack e-commerce application built using React for the frontend and Django for the backend. This project allows users to browse, search, and purchase electronic products seamlessly. It features user authentication, order management, and a responsive design for an optimal user experience.

## Features
- User registration and login
- Product browsing and searching
- Shopping cart functionality
- Order placement and payment processing
- User profile management
- Admin panel for managing products and orders

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Python 3.x installed
- Node.js and npm installed
- Django and Django REST Framework installed
- PostgreSQL or SQLite for the database (if using PostgreSQL, ensure you have it installed and running)

## Installation Process
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/My_Eletronic_Store.git
   cd My_Eletronic_Store
   ```

2. **Set up the backend:**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Create a virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows use `venv\Scripts\activate`
     ```
   - Install the required packages:
     ```bash
     pip install -r requirements.txt
     ```
   - Run migrations:
     ```bash
     python manage.py migrate
     ```
   - Create a superuser for the admin panel:
     ```bash
     python manage.py createsuperuser
     ```
   - Start the Django server:
     ```bash
     python manage.py runserver
     ```

3. **Set up the frontend:**
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install the required packages:
     ```bash
     npm install
     ```
   - Start the React application:
     ```bash
     npm start
     ```

## Project Structure
The project is organized into two main directories: `frontend` and `backend`.

### Frontend (`frontend`)
- **public/**: Contains static files like `index.html`, images, and the `robots.txt` file.
- **src/**: Contains the main application code.
  - **components/**: Reusable React components (e.g., `Header`, `Footer`, `Product`, `Loader`, etc.).
  - **screens/**: Different screens of the application (e.g., `HomeScreen`, `LoginScreen`, `CartScreen`, etc.).
  - **redux/**: Redux slices and store configuration for state management.
  - **mocks/**: Mock API calls for testing purposes.
  - **App.js**: Main application component that sets up routing.
  - **index.js**: Entry point for the React application.

### Backend (`backend`)
- **api/**: Contains the Django app for handling API requests.
  - **models.py**: Defines the database models for products, orders, and users.
  - **views/**: Contains the logic for handling requests and responses.
  - **urls/**: URL routing for the API endpoints.
  - **serializers.py**: Serializes data for API responses.
  - **migrations/**: Database migrations for the models.
- **backend/**: Contains the main Django project settings and configuration.
  - **settings.py**: Configuration settings for the Django project.
  - **urls.py**: URL routing for the Django application.
  - **wsgi.py**: Entry point for WSGI-compatible web servers.
  - **asgi.py**: Entry point for ASGI-compatible web servers.

## Conclusion
This project serves as a comprehensive e-commerce solution, showcasing the integration of React and Django. Feel free to contribute or modify the project as per your needs.
