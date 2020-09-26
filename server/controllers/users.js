const User = require("../models/users");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
	const users = await User.find();
	// console.log(users);
	res.status(200).json(users);
};

exports.postUser = async (req, res) => {
	const data = req.body;
	const hashed = await bcrypt.hash(data.password, 12);
	const newUser = new User({
		name: data.name,
		email: data.email,
		password: hashed,
		messages: [],
	});
	const result = await newUser.save();
	res.status(201).json(result);
};

exports.loginUser = async (req, res) => {
	const data = req.body;
	try {
		const user = await User.findOne({ email: data.email });
		if (!user) {
			const error = new Error("this email is not found");
			error.statusCode = 400;
			throw error;
		}
		const checkPass = await bcrypt.compare(data.password, user.password);
		if (checkPass) {
			res.status(200).json(user);
		} else {
			const error = new Error("password is not correct");
			error.statusCode = 400;
			throw error;
		}
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.addMessageToUser = async (req, res) => {
	const data = req.body;
	const user = await User.findOne({ name: data.name });
	const result = await user.addMessageToItemsArray(data);
	res.status(200).json(result.messages);
};
