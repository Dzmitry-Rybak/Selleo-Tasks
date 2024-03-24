# Project "Data Storage"

# Please use `npm start` - to run api
## Server is listening on port 5000

## Used Technologies

* **nodemon**: Automatic server reload.
* **cors**: CORS management in Express.
* **express**: Framework for web applications.
* **multer**: Uploading files.

# File Storage API

This API provides functionality for managing files and directories on the server.

## Used Technologies

- **Express**: Framework for handling HTTP requests.
- **FS (File System)**: Node.js module for working with the file system.
- **Path**: Node.js module for working with file and directory paths.
- **CORS**: Package for handling Cross-Origin Resource Sharing (CORS) in Express.
- **Multer**: Package for handling multipart forms and file uploading.

## Endpoint Description

- `GET /files`: Get a list of files and directories.
- `GET /files/{filename}`: Get the content of a file or a list of files in a directory.
- `POST /upload`: Upload a file to the server.