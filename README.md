# Warmup App - Cinema

## Description
Website for managing movies, viewings and reservations for a small cinema.
User can make reservations to created viewings.
Admin can manage movies, viewings and reservations.
To change the role of the user to Admin you need to change it manually in the database.

There is a set up admin account:
login - Admin@gmail.com
password - Admin

## Tools
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [.NET 7.0](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
* [Visual Studio Code](https://code.visualstudio.com/download)
* [Node.js](https://nodejs.org/en/download/)
* [PostreSQL](https://www.postgresql.org/download/)
* [pgAdmin](https://www.pgadmin.org/download/)

## Setup
To run the entire application using Docker, simply run the following command:
```
docker compose up
```

The applications are ported on these local addresses:
* PostgreSQL Database - http://localhost:5433 - database=postgres; username=postgres; password=postgres;
* .NET Backend - http://localhost:5000
* Angular Frontend - http://localhost:80

To see the cinema website, go to http://localhost:80
