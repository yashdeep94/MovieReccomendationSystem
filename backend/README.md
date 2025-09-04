# Movie Recommendation System Backend

This is the Django backend for the Movie Recommendation System. It provides RESTful APIs for user authentication, movie data, ratings, and personalized recommendations. The backend also handles data ingestion from the MovieLens dataset and serves as the core logic for the recommendation engine.

## Features

- User registration and authentication
- Movie data management (imported from MovieLens dataset)
- User ratings and review management
- Personalized movie recommendations using a pre-trained model
- API endpoints for frontend integration

## Folder Structure

```
backend/
    manage.py                # Django management script
    movie/                   # Main Django app for movie logic
    movie_recommendation/    # Django project settings
    ml-latest-small/         # MovieLens dataset files
    Trained_Model_Small_Dataset.sav  # Pre-trained recommendation model
    notebook/                # Jupyter notebooks for model training
```

## Getting Started

### Prerequisites

- Python 3.8+
- pip (Python package manager)
- (Optional) virtualenv for isolated environments

### Installation & Running

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. (Optional) Create and activate a virtual environment:
   ```sh
   python -m venv venv
   venv\Scripts\activate  # On Windows
   source venv/bin/activate  # On macOS/Linux
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt  # If available, else install Django and required packages manually
   ```
4. Run migrations:
   ```sh
   python manage.py migrate
   ```
5. (Optional) Populate the database:
   - There is a script to populate the database with MovieLens data. Uncomment the relevant code in `movie_recommendation/views.py`, run the server, and hit the specified URL to trigger data population.
6. Start the backend server:
   ```sh
   python manage.py runserver
   ```

The backend will run at [http://localhost:8000](http://localhost:8000) by default.

## API Endpoints

- User registration & login
- Movie list & details
- Rate movies
- Get recommendations

(See code for detailed endpoint documentation or use tools like Postman to explore the API.)

## Data & Model

- Uses the [MovieLens Small Dataset](https://grouplens.org/datasets/movielens/latest/) for movie metadata and ratings.
- A pre-trained model (`Trained_Model_Small_Dataset.sav`) is used for generating recommendations.
## Notebooks

Jupyter notebooks for model training and exploration are available in `notebook/`.
