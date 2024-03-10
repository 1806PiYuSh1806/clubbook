const pool = require("./connect")
async function getUserById(userId) {
  return new Promise((resolve, reject) => {
    const selectQuery = `SELECT * FROM users WHERE u_id = ?`;
    pool.query(selectQuery, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching student: " + err.stack);
        return reject(err);
      }
      if (results.length === 0) {
        console.error("Student not found");
        return reject(new Error("Student not found"));
      }
      resolve(results[0]);
    });
  });
}

async function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE u_email= ? AND u_password=?`;
    pool.query(query, [email, password], (err, res) => {
      if (err) {
        console.error("Error fetching user." + err.stack);
        return reject(err);
      }

      if (res.length === 0) {
        console.error("User not exists.");
        return resolve(null);
      }

      resolve(res[0]);
    });
  });
}

async function signupUser(userData) {
  return new Promise((resolve, reject) => {
    const { u_name, u_email, u_password } = userData;
    const insertQuery = `INSERT INTO users (u_name, u_email, u_password) VALUES (?, ?, ?)`;
    pool.query(insertQuery, [u_name, u_email, u_password], (err, results) => {
      if (err) {
        console.error("Error creating student: " + err.stack);
        return reject(err);
      }
      console.log("Student created successfully");
      const studentId = results.insertId; // Get the ID of the newly created student
      // Retrieve the created student by their ID
      getUserById(studentId)
        .then((student) => {
          resolve(student); // Resolve with the created student
        })
        .catch((err) => {
          reject(err); // Reject if there's an error retrieving the student
        });
    });
  });
}

module.exports = {
    getUserById,
    loginUser,
    signupUser,
};
