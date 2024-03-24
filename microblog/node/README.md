This Node.js backend server handles JSON file request.

### Routes

- **GET /posts**: Retrieves data from the JSON file.
- **POST /newpost**: Adds a new post.
- **DELETE /deletepost/:postId**: Deletes a specific post.

### Server Port

The server runs on port 5000.

### Usage

1. Clone this repository.
2. Navigate to the backend directory: `cd node`.
3. Install dependencies: `npm install`.
4. Start the development server:
   - Using npm: `npm start`.
   - Using Docker Compose: `docker-compose up` in the root directory.