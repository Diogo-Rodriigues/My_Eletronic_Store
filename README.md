# My Electronic Store

## Introduction
My Electronic Store is a full-stack e-commerce application built using React for the frontend and Django for the backend. This project allows users to browse, search, and purchase electronic products seamlessly. It features user authentication, order management, and a responsive design for an optimal user experience.

## Features
- User registration and login
![image](https://github.com/user-attachments/assets/a8598450-d25c-4aab-8574-8794981ccac2)
![image](https://github.com/user-attachments/assets/ae7e7a87-eac1-4891-8bfa-e97b8f8ef45a)

- Product browsing and searching
 ![image](https://github.com/user-attachments/assets/061d3735-9b0c-475c-b62b-b8a8112237cd)
![image](https://github.com/user-attachments/assets/c7e69a16-4bed-4cad-af90-82fe6b3e0ca9)
![image](https://github.com/user-attachments/assets/a3420bf1-f97f-46f4-9c74-29eb7ab1eddf)

- Products ratings
![image](https://github.com/user-attachments/assets/e5d32237-a320-46a0-9535-5e82e9646aa7)
![image](https://github.com/user-attachments/assets/8e60a20d-b7ff-40e2-bd02-20e850541ac0)
![image](https://github.com/user-attachments/assets/e950d2c7-e3f6-4f1f-bad5-b660f21e03ef)

- Shopping cart functionality
![image](https://github.com/user-attachments/assets/b71f7027-2199-4f38-b0aa-904947ee9ce8)
![image](https://github.com/user-attachments/assets/8d5a5c6b-0c8e-4ed0-b837-3f6f7292c736)
![image](https://github.com/user-attachments/assets/ce37ed95-2c16-4d1e-8df9-de0fea6ff78b)

- Order placement and payment processing
![image](https://github.com/user-attachments/assets/78d23bb3-a49b-414c-ae11-9f355637fb42)
![image](https://github.com/user-attachments/assets/514acf59-27f7-4a6b-bda7-933081481343)
![image](https://github.com/user-attachments/assets/d0a7e0ac-79ad-490f-a84f-1cbf06396fc9)
![image](https://github.com/user-attachments/assets/58e5f00f-0744-41c4-a22d-916decde4f65)
![image](https://github.com/user-attachments/assets/092ccd1e-bdea-43ea-9548-c2e8e46bda5e)


- User profile management
![image](https://github.com/user-attachments/assets/6b1aa544-af6a-47b6-a68c-80a53060e655)
![image](https://github.com/user-attachments/assets/9b5e3caf-02b9-4b29-803a-669496c6c19d)
![image](https://github.com/user-attachments/assets/da89a834-2029-4b38-8af0-de8720d7ff87)

- Admin panel for managing products and orders
![image](https://github.com/user-attachments/assets/0ae573d5-f426-4f9a-80bd-288c707fae83)
![image](https://github.com/user-attachments/assets/44ba9ec3-c0ac-471b-b607-a2c0850800dc)
![image](https://github.com/user-attachments/assets/996f8a00-82e7-4b48-b4d1-257edbaed5f2)
![image](https://github.com/user-attachments/assets/00872723-681e-40e0-84ee-c7ba14665e3e)
![image](https://github.com/user-attachments/assets/ed2e8ba2-ba22-45bf-82cd-4ceda48b1bd5)
![image](https://github.com/user-attachments/assets/fac248ef-fc2a-4c51-a41c-cc0c6af408af)
![image](https://github.com/user-attachments/assets/2f90c5bf-a24e-46ca-9c05-f33b67bad808)




## Prerequisites
Before you begin, ensure you have met the following requirements:
- Python 3.10 installed
- Node.js and npm installed
- Django and Django REST Framework installed
- SQLite for the database

## Installation Process
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Diogo-Rodriigues/My_Eletronic_Store.git
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

## Contributing

Contributions to improve the Library Management System are welcome. Please follow these steps:

1. Fork the repository:
   ![fork](https://github.com/user-attachments/assets/40a18cf5-031e-4134-bd73-e87cf22b57aa)
2. Clone the fork (`git clone repository_link`)
3. Navigate to the project directory (`cd LibraryManagementSystem-Cpp`)
4. Create a new branch (`git checkout -b feature/feature_name`)
5. Make your changes
6. Run the tests to ensure everything works (`./bin/run_tests`)
7. Commit your changes (`git add file_name`) | (`git commit -m "description"`)
8. Push to the branch (`git push origin feature/feature_name`)
9. Open a Pull Request
   ![pr](https://github.com/user-attachments/assets/0fb5947b-2a31-4240-b00d-12c9de24eee7)
10. Add a title and description for your Pull Request:
    ![submmit](https://github.com/user-attachments/assets/a30c6f0a-8752-43c4-965a-279220b01279)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
