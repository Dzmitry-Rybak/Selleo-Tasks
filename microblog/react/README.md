**Microblog Frontend**

This frontend application is developed using Create React App. It utilizes functional components and a custom hook `useHttp` for sending fetch requests to the server.

### Features

- View posts from different users on the microblog site.
- Add new posts.
- Like and dislike posts (5 likes, 10 dislikes).
- Utilizes React Router DOM for client-side routing.
- Incorporates react-transition-group for animations.

### Port

Runs on port 3000.

### Usage

1. Clone this repository.
2. Navigate to the frontend directory: `cd react`.
3. Install dependencies: `npm install`.
4. Start the development server:
   - Using npm: `npm start`.
   - Using Docker Compose: `docker-compose up` in the root directory.


### Custom Hooks
- **useHttp**: A custom hook for handling HTTP requests to the server.

### Libraries Used

- React Router DOM: For client-side routing.
- React Transition Group: For animations.