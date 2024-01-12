![image](https://github.com/JerryMcDonald/BalloonWorld/assets/35512632/a611e441-925e-4292-ad26-1cdc6ba27221)
# BalloonWorld Backend  

This is the backend part of Balloon World, developed using ASP.NET Core with a target framework of .NET 8.0. The easiest way to run it currently is to a SQL Express database.

## Getting Started

These instructions will get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- .NET 8.0 SDK
- SQL Server Express.

### Installing

1. Ensure SQL Server Express is installed and running on your machine.

    ```
    git clone https://github.com/yourusername/recipegen.git
    ```

2. Update the appsettings.json file with your database connection string. Example:

    ```
    "DefaultConnection": "Server=DESKTOP-EI2CUCL\\SQLEXPRESS;Database=BalloonWorldDb;Trusted_Connection=True;TrustServerCertificate=True;"
    ```

3. Navigate to the backend directory:

    ```
    cd backend
    ```

4. You need to restore the NuGet packages (dependencies) for your project. Open your terminal or command prompt, navigate to your backend project folder, and run:

    ```
    dotnet restore
    ```

5. Apply the existing migrations to create the database schema:

    ```
    dotnet ef database update
    ```

6. Start the backend application:

    ```
    dotnet run
    ```

   The application should now be running at [http://localhost:5044](http://localhost:5044).

## Features
  - RESTful API endpoints to manage game data.
  - Integration with SQL Server for data persistence.

