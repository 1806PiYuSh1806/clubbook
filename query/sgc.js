const pool = require("./connect");

async function getClubDetails(clubData) {
    return new Promise((resolve, reject) => {
        const {c_name, c_email, c_password} = clubData;
        const query = `SELECT * FROM clubs WHERE c_name = ? AND c_email = ? AND c_password = ?`;
        pool.query(query, [c_name, c_email, c_password], (err, res) => {
            if(err) {
                console.error("Error getting club details: " + err.stack);
                return reject(err);
            }
            if(res.length === 0){
                console.error("Wrong EMail ID or Password or No such Club exists.");
                return resolve(null);
            }
            resolve(res[0]);
        });
    });
}

async function getAllClubNames() {
  return new Promise ((resolve,reject)=>{
    const query = "SELECT * FROM clubs";
    pool.query(query, (err, res) => {
      if(err){
        console.log("Error getting Club Names.");
        return reject(err);
      }
      resolve(res);
    })
  })
}

async function deleteClub(c_id) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM clubs WHERE c_id=?";
    pool.query(query, [c_id], (err, result) => {
      if (err) {
        console.log("Error deleting the club");
        return reject(err);
      }

      // Check if rows were affected
      const rowsAffected = result.affectedRows;

      // Resolve with a boolean indicating whether rows were affected
      resolve(rowsAffected > 0);
    });
  });
}

async function addNewClub(club_data){
    const {c_name, c_email, c_password} = club_data;
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO clubs (c_name, c_email, c_password) VALUES (?, ?, ?)`;
        pool.query(query, [c_name, c_email, c_password], (err, res) => {
            if(err){
                return reject(err);
            }
            return resolve(res);
        })
    })
}

module.exports = {
    getClubDetails,
    getAllClubNames,
    deleteClub,
    addNewClub,
}