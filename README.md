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
- Python 3.10 installed
- Node.js and npm installed
- Django and Django REST Framework installed
- SQLite for the database

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
   - Create a virtual environment with python 3.10:
     ```bash
     py -3.10 -m venv env
     source env/bin/activate  # On Windows use `env\Scripts\activate`
     ```
   - Install the required packages:
     ```bash
     pip install -r requirements.txt
     ```
   -Try to run the backend:
     ```bash
     python manage.py runserver
     ```
   - Run migrations:
     ```bash
     python manage.py makemigrations api
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

4. **Set up the frontend:**
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

```plaintext
/frontend
    ├── public                     # Contains static files like `index.html`
    │   └── index.html
    │   └── logo.png
    │   └── robots.txt
    ├── src                        # Contains the main application code.
    │   ├── components             # Reusable React components (e.g., `Header`, `Footer`, `Product`, `Loader`, etc.).
    │   │   └── CheckoutSteps.js
    │   │   └── Footer.js
    │   │   └── FormContainer.js
    │   │   └── Header.js
    │   │   └── Loader.js
    │   │   └── Message.js
    │   │   └── Paginate.js
    │   │   └── Product.js
    │   │   └── ProductCarousel.js
    │   │   └── Rating.js
    │   │   └── SearchBox.js
    │   ├── mocks                 # Mock API calls for testing purposes.
    │   │   └── cart.js
    │   │   └── order.js
    │   │   └── product.js
    │   │   └── user.js
    │   ├── redux                 # Redux slices and store configuration for state management.
    │   │   ├── slices
    │   │   │   └── cartSlice.js
    │   │   │   └── rderSlice.js
    │   │   │   └── productSlice.js
    │   │   │   └── userSlice.js
    │   │   ├── store
    │   │   │   └── rootReducer.js
    │   │   │   └── store.js
    │   ├── screens               # Different screens of the application (e.g., `HomeScreen`, `LoginScreen`, `CartScreen`, etc.).
    │   │   └── CartScreen.js
    │   │   └── HomeScreen.js
    │   │   └── LoginScreen.js
    │   │   └── OrderScreen.js
    │   │   └── PaymentScreen.js
    │   │   └── PlaceOrderScreen.js
    │   │   └── ProductScreen.js
    │   │   └── ProfileScreen.js
    │   │   └── RegisterScreen.js
    │   │   └── ShippingScreen.js
    │   └── App.css
    │   └── App.js               # Main application component that sets up routing.
    │   └── App.test.js
    │   └── bootstrap.min.js
    │   └── index.css
    │   └── index.js             # Entry point for the React application.
    ├── package-lock.json
    ├── package.json

/backend
    ├── api                      # Contains the Django app for handling API requests.
    │   ├── migrations           # Database migrations for the models.
    │   ├── urls                 # URL routing for the API endpoints.
    │   │   └── order_url.py
    │   │   └── product_url.py
    │   │   └── user_url.py
    │   ├── views                # Contains the logic for handling requests and responses.
    │   │   └── order_view.py
    │   │   └── product_view.py
    │   │   └── user_view.py
    │   └── __init__.py
    │   └── admin.py
    │   └── apps.py
    │   └── models.py            # Defines the database models for products, orders, and users.
    │   └── serializers.py       # Serializes data for API responses.
    │   └── signals.py
    │   └── tests.py
    ├── backend                  # Contains the main Django project settings and configuration.
    │   └── __init__.py
    │   └── asgi.py              # Entry point for ASGI-compatible web servers.
    │   └── settings.py          # Configuration settings for the Django project.
    │   └── urls.py              # URL routing for the Django application.
    │   └── wsgi.py              # Entry point for WSGI-compatible web servers.
    ├── staticfiles
    │   ├── admin
    │   │   ├── css
    │   │   ├── fonts
    │   │   ├── img
    │   │   ├── js
    │   ├── rest_framework
    │   │   ├── css
    │   │   ├── docs
    │   │   ├── fonts
    │   │   ├── img
    │   │   ├── js
    ├── manage.py
    ├── Procfile
    ├── requirements.txt
    └── runtime.txt
```

## Conclusion
This project serves as a comprehensive e-commerce solution, showcasing the integration of React and Django. Feel free to contribute or modify the project as per your needs.
