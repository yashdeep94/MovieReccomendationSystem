# Movie Recommendation System Frontend

This is the React.js frontend for the Movie Recommendation System. It provides a modern, responsive user interface for browsing, searching, and rating movies, as well as viewing personalized recommendations and managing user profiles.

## Features

- User authentication (login/register)
- Search and browse movies
- View detailed movie information and posters
- Rate movies and get personalized recommendations
- User profile management
- Responsive and attractive UI

## Folder Structure

```
src/
	components/         # React components (AllMovies, Login, Home, MovieDetails, etc.)
	contexts/           # React Context for global state management
	css/                # Component-specific CSS files
	images/             # Movie poster images and logos
	App.js              # Main app component
	index.js            # Entry point
public/
	index.html          # Main HTML file
	...                 # Static assets
```

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm

### Installation & Running

1. Install dependencies:
	 ```sh
	 npm install
	 ```
2. Start the development server:
	 ```sh
	 npm start
	 ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

The frontend expects the Django backend to be running (by default at [http://localhost:8000](http://localhost:8000)).

## Customization

- Update API endpoints in the code if your backend runs on a different URL or port.
- Add or update images in `src/images/` for movie posters.

## Scripts

- `npm start` – Start the development server
- `npm run build` – Build the app for production
- `npm test` – Run tests

## Learn More

- [React documentation](https://reactjs.org/)
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
