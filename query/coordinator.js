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

async function addEvent(eventData) {
    return new Promise((resolve, reject) => {
        const {c_id, e_name, e_startDate, e_endDate} = eventData;
        const query = `INSERT INTO events (c_id ,e_name, e_startDate, e_endDate) VALUES (?, ?, ?, ?)`;
        pool.query(query, [c_id, e_name, e_startDate, e_endDate], (err, res) => {
            if(err){
                console.log("Error adding event");
                return reject(err);
            }
            return resolve(res);
        })
    })
}

module.exports = {
    getAllEvents,
    addEvent,
}