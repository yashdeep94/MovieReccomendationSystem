# Movie Recommendation System

An end-to-end Movie Recommendation System with a Django backend and a React frontend. This project provides personalized movie recommendations, user authentication, and a modern UI for exploring and rating movies.

## Features

- **Personalized Recommendations:** Suggests movies based on user ratings and preferences.
- **User Authentication:** Secure login and registration system.
- **Movie Search & Details:** Browse, search, and view detailed information about movies.
- **User Profiles:** Manage your profile and see your rated movies.
- **Attractive UI:** Modern, responsive frontend built with React.

## Project Structure

```
├── backend/                # Django backend
│   ├── manage.py
│   ├── movie/              # Django app for movie logic
│   ├── movie_recommendation/ # Django project settings
│   ├── ml-latest-small/    # MovieLens dataset
│   └── Trained_Model_Small_Dataset.sav # Pre-trained recommendation model
├── frontend/
│   └── movie-reccomendation/ # React frontend app
│       ├── src/
│       └── public/
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js (v14+ recommended) & npm
- pip (Python package manager)

### Backend Setup (Django)

1. Navigate to the backend directory:
	```sh
	cd backend
	```
2. Install dependencies:
	```sh
	pip install -r requirements.txt  # If requirements.txt exists, else install Django and required packages manually
	```
3. Run migrations:
	```sh
	python manage.py migrate
	```
4. (Optional) Populate the database:
	- There is a script to populate the database with MovieLens data. Uncomment the relevant code in `movie_recommendation/views.py`, run the server, and hit the specified URL to trigger data population.
5. Start the backend server:
	```sh
	python manage.py runserver
	```

### Frontend Setup (React)

1. Navigate to the frontend app directory:
	```sh
	cd frontend/movie-reccomendation
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Start the frontend development server:
	```sh
	npm start
	```

The React app will typically run on [http://localhost:3000](http://localhost:3000) and the Django backend on [http://localhost:8000](http://localhost:8000).

## Usage

1. Register or log in as a user.
2. Search for movies, rate them, and get personalized recommendations.
3. Explore movie details and manage your profile.

## Data & Model

- Uses the [MovieLens Small Dataset](https://grouplens.org/datasets/movielens/latest/) for movie metadata and ratings.
- A pre-trained model (`Trained_Model_Small_Dataset.sav`) is used for generating recommendations.

## Notebooks

Jupyter notebooks for model training and exploration are available in `backend/notebook/`.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
