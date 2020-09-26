const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const msgRoutes = require("./routes/messages");
const userRoutes = require("./routes/users");
const Pusher = require("pusher");
const bcrypt = require("bcryptjs");
const User = require("./models/users");

const app = express();
const port = process.env.PORT || 9000;
app.use(cors());
app.use(express.json());

mongoose
	.connect(
		"mongodb+srv://mohNabil:satriani@practicing.i9k4n.gcp.mongodb.net/Practicing?retryWrites=true&w=majority",
		{
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() =>
		app.listen(port, () =>
			console.log(`connected on port ${port}- connected to mongoose`)
		)
	)
	.catch((err) => console.log(err));

const pusher = new Pusher({
	appId: "1071513",
	key: "dc6b2b525a365c4d4ac1",
	secret: "f39318b8703170c63765",
	cluster: "eu",
	encrypted: true,
});

const db = mongoose.connection;

db.once("open", () => {
	console.log("DB connected");
	const msgCollection = db.collection("messages");
	const changeStream = msgCollection.watch();
	changeStream.on("change", (change) => {
		if (change.operationType === "insert") {
			const msgDetails = change.fullDocument;
			pusher.trigger("messages", "inserted", {
				name: msgDetails.name,
				message: msgDetails.message,
				received: msgDetails.received,
				id: msgDetails.id,
				timestamp: msgDetails.timestamp,
				sendTo: msgDetails.sendTo,
			});
		} else {
			console.log("error in pusher");
		}
	});
});

app.use(msgRoutes);
app.use(userRoutes);
