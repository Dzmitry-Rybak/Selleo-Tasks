# Data Storage Project

This project encompasses both the frontend application and the backend API for managing files and directories on the server.

# Please use the command `npm start` for both the frontend and api directories to run the project.
## Client is listening on port 3000
## Server is listening on port 5000


## Technologies Used

### Frontend:
- **React**: JavaScript library for building user interfaces.
- **React Router**: Declarative routing for React applications.
- **SCSS**: Syntactically Awesome Style Sheets, a CSS extension language.

### Backend:
- **Express**: Framework for handling HTTP requests.
- **FS (File System)**: Node.js module for working with the file system.
- **Path**: Node.js module for working with file and directory paths.
- **CORS**: Package for handling Cross-Origin Resource Sharing (CORS) in Express.
- **Multer**: Package for file uploading.

## Usage

The frontend application provides a user-friendly interface for users to interact with the file storage system. Users can navigate through folders, view text files and images, and upload files.

## Functionality

### Frontend:
- **Navigation through files and directories**: Users can browse the contents of the file system, navigate between directories, and view their contents.
- **File viewing**: The application supports viewing text files (such as JSON, TXT) and images (PNG, JPG, JPEG).
- **File upload**: Users can upload files using the appropriate interface.

### Backend:
- **Endpoint Description**:
  - `GET /files`: Get a list of files and directories.
  - `GET /files/{filename}`: Get the content of a file or a list of files in a directory.
  - `POST /upload`: Upload a file to the server.