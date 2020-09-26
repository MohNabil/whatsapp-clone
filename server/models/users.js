const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	messages: {
		items: [
			{
				msgId: { type: schema.Types.ObjectId, ref: "Message" },
				message: { type: String },
				timestamp: { type: String },
				received: { type: Boolean },
				sendTo: { type: String },
			},
		],
	},
});

userSchema.methods.addMessageToItemsArray = function (msg) {
	const updatedMsgArray = [...this.messages.items];
	updatedMsgArray.push({
		msgId: msg._id,
		message: msg.message,
		timestamp: msg.timestamp,
		received: msg.received,
		sendTo: msg.sendTo,
	});
	const updatedMsgs = {
		items: updatedMsgArray,
	};
	this.messages = updatedMsgs;
	return this.save();
};

module.exports = mongoose.model("User", userSchema);
