const db = require('../db');

module.exports = {
    addLog: (userId, userName, itemId, itemName, action) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO logs (userId, userName, itemId, itemName, action) VALUES (?, ?, ?, ?, ?)',
                [userId, userName, itemId, itemName, action],
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
