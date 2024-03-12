const mysql = require("mysql");
const dotenv = require("dotenv");


dotenv.config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
})

db.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Connected to MySQL.")
  createDbAndTable();
});

function createDbAndTable() {
    const query1 = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;
    const query2 = `USE ${process.env.DB_NAME}`;
    const query3 =  `CREATE TABLE IF NOT EXISTS clubs (
        c_id INT AUTO_INCREMENT PRIMARY KEY,
        c_name VARCHAR(225) NOT NULL,
        c_email VARCHAR(250) NOT NULL,
        c_password VARCHAR(100) NOT NULL
    )`;    
    const query4 =  `CREATE TABLE IF NOT EXISTS events (
        e_id INT AUTO_INCREMENT PRIMARY KEY,
        c_id INT,
        e_name VARCHAR(225) NOT NULL,
        e_startDate DATE NOT NULL,
        e_endDate DATE NOT NULL,
        FOREIGN KEY (c_id) REFERENCES clubs(c_id) ON DELETE CASCADE ON UPDATE CASCADE
    )`;
    const query5 =  `CREATE TABLE IF NOT EXISTS posts (
        p_id INT AUTO_INCREMENT PRIMARY KEY,
        e_id INT,
        p_image BLOB NOT NULL,
        p_description VARCHAR(500) NOT NULL,
        FOREIGN KEY (e_id) REFERENCES events(e_id) ON DELETE CASCADE ON UPDATE CASCADE
    )`;
    const query6 =  `CREATE TABLE IF NOT EXISTS clubcoordinators (
        cc_id INT AUTO_INCREMENT PRIMARY KEY,
        c_id INT,
        cc_image BLOB NOT NULL,
        cc_name VARCHAR(250) NOT NULL,
        FOREIGN KEY (c_id) REFERENCES clubs(c_id) ON DELETE CASCADE ON UPDATE CASCADE
    )`;
    const query7 =  `CREATE TABLE IF NOT EXISTS users (
        u_id INT AUTO_INCREMENT PRIMARY KEY,
        u_name VARCHAR(225) NOT NULL,
        u_email VARCHAR(250) NOT NULL,
        u_password VARCHAR(100) NOT NULL
    )`;

    executeQuery(query1, "Database creation successful", "Error creating database");
    executeQuery(query2, "Database switch successful", "Error switching to database");
    executeQuery(query3, "'clubs' table creation successful", "Error creating 'clubs' table");
    executeQuery(query4, "'events' table creation successful", "Error creating 'events' table");
    executeQuery(query5, "'posts' table creation successful", "Error creating 'posts' table");
    executeQuery(query6, "'clubcoordinators' table creation successful", "Error creating 'clubcoordinators' table");
    executeQuery(query7, "'users' table creation successful", "Error creating 'users' table");

    db.end((err) => {
        if(err){
            console.log("Error in closing connection" + err.stack);
        }
        else{
            console.log("Connection closed successfully");
        }
    });
}

function executeQuery(query, successMsg, errMsg) {
    db.query(query, (err, res) => {
        if(err) {
            console.error(errMsg + ": " + err.stack);
        }
        else{
            console.log(successMsg);
        }
    });
}
