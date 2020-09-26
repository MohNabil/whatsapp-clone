const Message = require("../models/messages");

exports.getAllMessages = async (req, res) => {
	const messages = await Message.find();
	res.status(200).json(messages);
};

exports.getUserMessages = async (req, res) => {
	const name = req.params.name;
	const userMsgs = await Message.find({ sendTo: name });
	res.status(200).json(userMsgs);
};

exports.postMsg = async (req, res) => {
	const data = req.body;
	const message = new Message({
		message: data.message,
		name: data.name,
		timestamp: data.timestamp,
		received: data.received,
		userId: data.userId,
		sendTo: data.sendTo,
	});
	try {
		const msg = await message.save();
		// console.log(msg);
		res.status(201).json(msg);
	} catch (err) {
		console.log(err);
	}
};
