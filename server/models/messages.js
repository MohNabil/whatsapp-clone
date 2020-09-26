const mongoose = require("mongoose");
const schema = mongoose.Schema;

const msgSchema = new schema({
	message: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	timestamp: {
		type: String,
	},
	received: {
		type: Boolean,
	},
	userId: {
		type: schema.Types.ObjectId,
		ref: "User",
	},
	sendTo: {
		type: String,
	},
});

module.exports = mongoose.model("Message", msgSchema);
