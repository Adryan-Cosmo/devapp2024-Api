const LogModel = require('../models/LogModel');

module.exports = {
    add: async (req, res) => {
        const { userId, userName, itemId, itemName, action, timestamp } = req.body;

        if (userId && userName && itemId && itemName && action && timestamp) {
            try {
                const logId = await LogModel.addLog(userId, userName, itemId, itemName, action, timestamp);
                res.json({ success: true, logId });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        } else {
            res.status(400).json({ success: false, error: 'Parâmetros inválidos' });
        }
    },
};
