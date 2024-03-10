# ClubBook

ClubBook is a web application that facilitates club management, event organization, and user interaction.

## Features

- **User Signup and Login:** Allow users to create accounts and log in securely.

- **Club Creation and Management:** Users can create and manage their own clubs.

- **Event Planning:** Clubs can organize events, specifying details such as name, start date, and end date.

- **User Interaction:** Users can join clubs, participate in events, and engage with other members.

## Technologies Used

- **Node.js:** Backend runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MySQL:** Database management system for storing user, club, and event data.
- **EJS:** Templating engine for rendering dynamic content.

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/1806PiYuSh1806/clubbook.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:

    Create a `.env` file in the root directory and add the following:

    ```env
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASS=your_database_password
    DB_NAME=your_database_name
    ```

4. Create Database locally:

    ```bash
    node model/create_db.js
    ```

5. Run the application:

    ```bash
    npm start
    ```

    The application will be accessible at `http://localhost:3000`.

## Database Structure

The database schema includes tables for users, clubs, events, and more. Refer to the database setup scripts in the `./db` directory for details.

## Contributing

Contributions are welcome! If you'd like to contribute to ClubBook, please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- Special thanks to [contributors](https://github.com/your-username/clubbook/graphs/contributors) who have helped make ClubBook better.

Feel free to update the sections, add more details, or include any specific information relevant to your project. Additionally, you might want to include sections like "Usage," "Deployment," or "Troubleshooting" based on your project's needs.
