# Aplikacja Rozgrzewkowa - Kino

## Description
Website for managing movies, viewings and reservations for a small cinema.
User can make reservations to created viewings.
Admin can manage movies, viewings and reservations.
To change the role of the user to Admin you need to change it manually in the database.

## Tools
* [.NET 7.0](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
* [Visual Studio Code](https://code.visualstudio.com/download)
* [Node.js](https://nodejs.org/en/download/)
* [PostreSQL](https://www.postgresql.org/download/)
* [pgAdmin](https://www.pgadmin.org/download/)

## Setup
Before running the application you either need to create a local PostgreSQL database according to the DatabaseConnection inside the file appsettings.json
or create a local database and change the database connection string.

To create the database structure, run the following command:
```
dotnet ef database update
```

To run the application, run the following commands:
```
dotnet build
dotnet run
```

Go to the https://localhost:7165 and wait until the SPA runs on https://localhost:44486.