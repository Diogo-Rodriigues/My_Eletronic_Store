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

```plaintext
/frontend
    ├── auth
    │   └── auth.js
    ├── bin
    │   └── www
    ├── controllers
    │   └── uc.js
    ├── models
    │   └── uc.js
    ├── routes
    │   └── ucs.js
    ├── app.js
    ├── Dockerfile
    ├── Dockerfile-seed
    ├── ucs.json
    ├── users.json
    └── package.json

/backend
    ├── api
    │   └── auth.js
    ├── backend
    │   └── www
    ├── models
    │   └── user.js
    ├── routes
    │   └── index.js
    ├── app.js
    ├── Dockerfile
    └── package.json
```

## Conclusion
This project serves as a comprehensive e-commerce solution, showcasing the integration of React and Django. Feel free to contribute or modify the project as per your needs.
