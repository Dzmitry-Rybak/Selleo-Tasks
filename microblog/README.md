# Microblog

This is a simple microblog application with the following features:

## TODO:

1. Display mocked posts list.
2. Create a form to add a new post.
3. Add notifications to inform the creator that a post was added.
4. Implement a simple voting system for each post with 5 likes (+) and 10 dislikes (-).
5. Import 3 default articles from an external JSON file.
6. Implement the ability to remove posts.
7. Display the current count of articles.

----------------

### Docker Compose

This Docker-compose.yml is used to containerize the microblog application. It consists of two services: `node` and `nginx`.

### Port

Run it on port 80.

### Services

- **node**: Builds the Node.js backend server. It restarts always and exposes port 5000.
- **nginx**: It exposes port 80 and mounts volumes for configuration (`nginx.conf`) and static files (`react/build`).

### Usage

1. Clone this repository.
2. Navigate to the project directory.
3. Run `docker-compose up` to build and start the containers.

### Ports

- The Node.js server runs on port 5000.
- Nginx serves static files on port 80.

## Docker Integration

This project provides Dockerfiles and a Docker Compose configuration for easy deployment and management. Docker allows for containerized execution of the frontend and backend components, simplifying the setup process for development and production environments.

### Dockerfiles:
- Dockerfiles are provided for both the frontend and backend components to build the respective Docker images.

### docker-compose.yml:
- The `docker-compose.yml` file defines services for the frontend and backend, along with their configurations and dependencies. It enables the seamless orchestration of the entire application stack with a single command.

By utilizing Docker, developers can quickly spin up the entire project environment with minimal setup, ensuring consistency and portability across different systems.