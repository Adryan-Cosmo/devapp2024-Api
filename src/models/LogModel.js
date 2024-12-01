const db = require('../db');

module.exports = {
    addLog: (userId, userName, itemId, itemName, action, timestamp) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO logs (userId, userName, itemId, itemName, action, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
                [userId, userName, itemId, itemName, action, timestamp],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results.insertId);
                }
            );
        });
    },
};
