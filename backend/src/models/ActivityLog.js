const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    action: {
        type: String,
        required: true,
    },

    module: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    ipAddress: {
        type: String,
    }
},
{
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("ActivityLog", activityLogSchema);