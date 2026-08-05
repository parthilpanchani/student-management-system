const ActivityLog = require("../models/ActivityLog");

const logActivity = async ({
    userId,
    action,
    module,
    description,
    ipAddress,
}) => {
    try {
        await ActivityLog.create({
            user: userId,
            action,
            module,
            description,
            ipAddress,
        });
    } catch (error) {
        console.error("Activity Log Error:", error.message);
    }
};

module.exports = logActivity;