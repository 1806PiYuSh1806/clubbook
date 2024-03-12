const pool = require("./connect");

async function getAllEvents(c_id){
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM events WHERE c_id = ?";
        pool.query(query, [c_id], (err, res) => {
            if(err){
                console.log("Error fetching events.");
                return reject(err);
            }
            if(res.lenght == 0){
                console.log("No events yet.");
                return resolve(null);
            }
            return resolve(res);
        })
    })
}

module.exports = {
    getAllEvents,
}